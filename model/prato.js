import { db } from '../controller/db.js';

export class Pratos {
    
    async create(nome_prato, preco, categoria, imagem = null, tipo_imagem = null, descricao = null) {
        try {
            const [result] = await db.query(
                'INSERT INTO Prato (nome_prato, descricao, preco, categoria, imagem, tipo_imagem) VALUES (?, ?, ?, ?, ?, ?)',
                [nome_prato, descricao, preco, categoria, imagem, tipo_imagem]
            );
            return { id_prato: result.insertId, nome_prato, descricao, preco, categoria, imagem, tipo_imagem };
        } catch (error) {
            console.error('Erro ao criar prato:', error);
            throw error;
        }
    }

    async list() {
        try {
            const [pratos] = await db.query('SELECT * FROM Prato ORDER BY nome_prato');
            return pratos;
        } catch (error) {
            console.error('Erro ao listar pratos:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const [pratos] = await db.query('SELECT * FROM Prato WHERE id_prato = ?', [id]);
            return pratos[0];
        } catch (error) {
            console.error('Erro ao buscar prato:', error);
            throw error;
        }
    }

    async getByCategoria(categoria) {
        try {
            const [pratos] = await db.query('SELECT * FROM Prato WHERE categoria = ? ORDER BY nome_prato', [categoria]);
            return pratos;
        } catch (error) {
            console.error('Erro ao buscar pratos por categoria:', error);
            throw error;
        }
    }

    async update(id, nome_prato, preco, categoria, imagem = null, tipo_imagem = null, descricao = null) {
        try {
            const [result] = await db.query(
                'UPDATE Prato SET nome_prato = ?, descricao = ?, preco = ?, categoria = ?, imagem = ?, tipo_imagem = ? WHERE id_prato = ?',
                [nome_prato, descricao, preco, categoria, imagem, tipo_imagem, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar prato:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM Prato WHERE id_prato = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao deletar prato:', error);
            throw error;
        }
    }
}
