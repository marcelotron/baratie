import { db } from '../controller/db.js';

export class Pedidos {
    
    async create(id_mesa, id_prato, quantidade_unidade = 1, nome_cliente = null, observacao = null) {
        try {
            const [result] = await db.query(
                'INSERT INTO Pedido (id_mesa, id_prato, quantidade_unidade, nome_cliente, observacao) VALUES (?, ?, ?, ?, ?)',
                [id_mesa, id_prato, quantidade_unidade, nome_cliente, observacao]
            );
            return { 
                id_pedido: result.insertId, 
                id_mesa, 
                id_prato, 
                quantidade_unidade, 
                nome_cliente, 
                observacao 
            };
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw error;
        }
    }

    async list() {
    try {
        const [pedidos] = await db.query('SELECT * FROM Pedido_Interface ORDER BY id_pedido DESC');
        return pedidos;
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        throw error;
    }
}

    async getById(id) {
        try {
            const [pedidos] = await db.query('SELECT * FROM Pedido_Interface WHERE id_pedido = ?', [id]);
            return pedidos[0];
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            throw error;
        }
    }

    async getByMesa(id_mesa) {
    try {
        const [pedidos] = await db.query("SELECT * FROM Pedido_Interface WHERE id_mesa = ? ORDER BY id_pedido DESC", [id_mesa]);
        return pedidos;
    } catch (error) {
        console.error('Erro ao buscar pedidos da mesa:', error);
        throw error;
    }
}

    async update(id, id_mesa, id_prato, quantidade_unidade, nome_cliente = null, observacao = null) {
        try {
            const [result] = await db.query(
                'UPDATE Pedido SET id_mesa = ?, id_prato = ?, quantidade_unidade = ?, nome_cliente = ?, observacao = ? WHERE id_pedido = ?',
                [id_mesa, id_prato, quantidade_unidade, nome_cliente, observacao, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            throw error;
        }
    }

    async updateQuantidade(id, quantidade_unidade) {
        try {
            const [result] = await db.query(
                'UPDATE Pedido SET quantidade_unidade = ? WHERE id_pedido = ?',
                [quantidade_unidade, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar quantidade do pedido:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM Pedido WHERE id_pedido = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            throw error;
        }
    }

    async getTotalMesa(id_mesa) {
        try {
            const [result] = await db.query(
                'SELECT SUM(soma_prato) as total FROM Pedido_Interface WHERE id_mesa = ?',
                [id_mesa]
            );
            return result[0]?.total || 0;
        } catch (error) {
            console.error('Erro ao calcular total da mesa:', error);
            throw error;
        }
    }
}
