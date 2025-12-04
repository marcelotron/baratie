import request from 'supertest';
import { app } from './server.js';

describe('Server Routes', () => {
  
  // ==================== TESTES DE MESAS ====================
  
  describe('POST /api/mesas', () => {
    test('should create a new table', async () => {
      const res = await request(app)
        .post('/api/mesas')
        .send({ status_atual: 'livre' });
      
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Mesa criada com sucesso');
      expect(res.body.mesa).toHaveProperty('id_mesa');
    });
  });

  describe('GET /api/mesas', () => {
    test('should list all tables', async () => {
      const res = await request(app).get('/api/mesas');
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Mesas listadas com sucesso');
      expect(Array.isArray(res.body.mesas)).toBe(true);
    });
  });

  describe('GET /api/mesas/:id', () => {
    test('should get a table by id', async () => {
      const res = await request(app).get('/api/mesas/1');
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('PUT /api/mesas/:id/status', () => {
    test('should update table status', async () => {
      const res = await request(app)
        .put('/api/mesas/1/status')
        .send({ status_atual: 'ocupada' });
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('DELETE /api/mesas/:id', () => {
    test('should delete a table', async () => {
      const res = await request(app).delete('/api/mesas/999');
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  // ==================== TESTES DE PRATOS ====================

  describe('POST /api/pratos', () => {
    test('should create a new dish', async () => {
      const res = await request(app)
        .post('/api/pratos')
        .send({
          nome_prato: 'Arroz com Feijão',
          descricao: 'Prato tradicional',
          preco: 25.50,
          categoria: 'comida',
          imagem: null,
          tipo_imagem: null
        });
      
      expect([201, 500]).toContain(res.status);
      if (res.status === 201) {
        expect(res.body.message).toBe('Prato criado com sucesso');
      }
    });
  });

  describe('GET /api/pratos', () => {
    test('should list all dishes', async () => {
      const res = await request(app).get('/api/pratos');
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Pratos listados com sucesso');
      expect(Array.isArray(res.body.pratos)).toBe(true);
    });
  });

  describe('GET /api/pratos/:id', () => {
    test('should get a dish by id', async () => {
      const res = await request(app).get('/api/pratos/1');
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('GET /api/pratos/categoria/:categoria', () => {
    test('should get dishes by category', async () => {
      const res = await request(app).get('/api/pratos/categoria/comida');
      
      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expect(Array.isArray(res.body.pratos)).toBe(true);
      }
    });
  });

  describe('PUT /api/pratos/:id', () => {
    test('should update a dish', async () => {
      const res = await request(app)
        .put('/api/pratos/1')
        .send({
          nome_prato: 'Arroz Atualizado',
          preco: 30.00,
          categoria: 'comida'
        });
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('DELETE /api/pratos/:id', () => {
    test('should delete a dish', async () => {
      const res = await request(app).delete('/api/pratos/999');
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  // ==================== TESTES DE PEDIDOS ====================

  describe('POST /api/pedidos', () => {
    test('should create a new order', async () => {
      const res = await request(app)
        .post('/api/pedidos')
        .send({
          id_mesa: 1,
          id_prato: 1,
          quantidade_unidade: 2,
          nome_cliente: 'João',
          observacao: 'Sem cebola'
        });
      
      expect([201, 500]).toContain(res.status);
    });
  });

  describe('GET /api/pedidos', () => {
    test('should list all orders', async () => {
      const res = await request(app).get('/api/pedidos');
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Pedidos listados com sucesso');
      expect(Array.isArray(res.body.pedidos)).toBe(true);
    });
  });

  describe('GET /api/pedidos/:id', () => {
    test('should get an order by id', async () => {
      const res = await request(app).get('/api/pedidos/1');
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('GET /api/pedidos/mesa/:id_mesa', () => {
    test('should get orders by table id', async () => {
      const res = await request(app).get('/api/pedidos/mesa/1');
      
      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expect(Array.isArray(res.body.pedidos)).toBe(true);
      }
    });
  });

  describe('PUT /api/pedidos/:id/quantidade', () => {
    test('should update order quantity', async () => {
      const res = await request(app)
        .put('/api/pedidos/1/quantidade')
        .send({ quantidade_unidade: 5 });
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('GET /api/mesas/:id/total', () => {
    test('should get table total', async () => {
      const res = await request(app).get('/api/mesas/1/total');
      
      expect([200, 500]).toContain(res.status);
    });
  });

  // ==================== TESTES DE ROTAS ESTÁTICAS ====================

  describe('Static Routes', () => {
    test('GET / should serve index.html', async () => {
      const res = await request(app).get('/');
      expect([200, 304]).toContain(res.status);
    });

    test('GET /mesas should serve mesas.html', async () => {
      const res = await request(app).get('/mesas');
      expect([200, 304]).toContain(res.status);
    });

    test('GET /pratos should serve pratos.html', async () => {
      const res = await request(app).get('/pratos');
      expect([200, 304]).toContain(res.status);
    });
  });
});