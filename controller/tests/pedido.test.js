import { jest } from '@jest/globals';

const queryMock = jest.fn();

jest.unstable_mockModule('mysql2/promise', () => ({
  default: {
    createConnection: jest.fn().mockResolvedValue({
      query: queryMock,
    }),
  },
}));

const { Pedidos } = await import('../../model/pedido.js');

describe('Pedidos - criação incremental por mesa e resumo', () => {
  let pedidos;

  beforeEach(() => {
    pedidos = new Pedidos();
    queryMock.mockReset();
  });

  test('cria pedidos incrementais para a mesma mesa', async () => {

    queryMock
      .mockResolvedValueOnce([{ insertId: 1 }]) 
      .mockResolvedValueOnce([{ insertId: 2 }]); 

    const pedido1 = await pedidos.create(1, 10, 1, 'Cliente A', null);
    const pedido2 = await pedidos.create(1, 11, 2, 'Cliente A', 'sem gelo');

    expect(queryMock).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('INSERT INTO Pedido'),
      [1, 10, 1, 'Cliente A', null, 'aberto']
    );

    expect(queryMock).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('INSERT INTO Pedido'),
      [1, 11, 2, 'Cliente A', 'sem gelo', 'aberto']
    );

    expect(queryMock).toHaveBeenCalledTimes(2);

    expect(pedido1).toEqual({
      id_pedido: 1,
      id_mesa: 1,
      id_prato: 10,
      quantidade_unidade: 1,
      nome_cliente: 'Cliente A',
      observacao: null,
      status_pedido: 'aberto',
    });

    expect(pedido2).toEqual({
      id_pedido: 2,
      id_mesa: 1,
      id_prato: 11,
      quantidade_unidade: 2,
      nome_cliente: 'Cliente A',
      observacao: 'sem gelo',
      status_pedido: 'aberto',
    });
  });

  test('retorna a lista de pedidos da mesa (resumo detalhado)', async () => {
    const pedidosMesaFake = [
      { id_pedido: 10, id_mesa: 1, nome_prato: 'Prato 1', soma_prato: 20.0 },
      { id_pedido: 11, id_mesa: 1, nome_prato: 'Prato 2', soma_prato: 30.0 },
    ];

    queryMock.mockResolvedValueOnce([pedidosMesaFake]);

    const resultado = await pedidos.getByMesa(1);

    expect(queryMock).toHaveBeenCalledWith(
      expect.stringContaining('FROM Pedido_'), 
      [1]                                     
    );

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado).toHaveLength(2);
    expect(resultado).toEqual(pedidosMesaFake);
  });

  test('calcula o total da mesa corretamente', async () => {

    queryMock.mockResolvedValueOnce([[{ total: 75.5 }]]);

    const total = await pedidos.getTotalMesa(1);

    expect(queryMock).toHaveBeenCalledWith(
      expect.stringContaining('SELECT SUM'),
      [1]
    );

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(total).toBe(75.5);
  });

  test('retorna 0 no total da mesa quando não há pedidos', async () => {

    queryMock.mockResolvedValueOnce([[]]);

    const total = await pedidos.getTotalMesa(1);

    expect(queryMock).toHaveBeenCalledWith(
      expect.stringContaining('SELECT SUM'),
      [1]
    );

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(total).toBe(0);
  });
});
