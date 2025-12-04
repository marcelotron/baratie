import { db } from '../controller/db.js';

export class Mesas {
    
    async create(status_atual = 'livre') {
        try {
            const [result] = await db.query(
                'INSERT INTO Mesa (status_atual) VALUES (?)',
                [status_atual]
            );
            return { id_mesa: result.insertId, status_atual };
        } catch (error) {
            console.error('Erro ao criar mesa:', error);
            throw error;
        }
    }

    async list() {
        try {
            const [mesas] = await db.query('SELECT * FROM Mesa ORDER BY id_mesa');
            return mesas;
        } catch (error) {
            console.error('Erro ao listar mesas:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const [mesas] = await db.query('SELECT * FROM Mesa WHERE id_mesa = ?', [id]);
            return mesas[0];
        } catch (error) {
            console.error('Erro ao buscar mesa:', error);
            throw error;
        }
    }

    async updateStatus(id, status_atual) {
        try {
            const [result] = await db.query(
                'UPDATE Mesa SET status_atual = ? WHERE id_mesa = ?',
                [status_atual, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar status da mesa:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM Mesa WHERE id_mesa = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao deletar mesa:', error);
            throw error;
        }
    }
}