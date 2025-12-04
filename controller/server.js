import { Mesas } from '../model/mesa.js';
import { Pratos } from '../model/prato.js';
import { Pedidos } from '../model/pedido.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const mesas = new Mesas();
const pratos = new Pratos();
const pedidos = new Pedidos();

// Processa o json no corpo da requisição
app.use(express.json());

// Serve arquivos estáticos da pasta view
app.use(express.static(path.join(__dirname, '../view')));

// ==================== ROTAS DE MESAS ====================

app.post('/api/mesas', async (req, res) => {
    try {
        const { status_atual } = req.body;
        const mesaCriada = await mesas.create(status_atual);
        console.log("Mesa criada:", mesaCriada);
        
        return res.status(201).json({
            message: "Mesa criada com sucesso",
            mesa: mesaCriada
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar mesa",
            error: error.message
        });
    }
});

app.get('/api/mesas', async (req, res) => {
    try {
        const lista_mesas = await mesas.list();
        
        return res.status(200).json({
            message: "Mesas listadas com sucesso",
            mesas: lista_mesas
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao listar mesas",
            error: error.message
        });
    }
});

app.get('/api/mesas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const mesa = await mesas.getById(id);
        
        if (!mesa) {
            return res.status(404).json({ message: "Mesa não encontrada" });
        }
        
        return res.status(200).json(mesa);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar mesa",
            error: error.message
        });
    }
});

app.put('/api/mesas/:id/status', async (req, res) => {
    try {
        const id = req.params.id;
        const { status_atual } = req.body;
        
        const atualizado = await mesas.updateStatus(id, status_atual);
        
        if (!atualizado) {
            return res.status(404).json({ message: "Mesa não encontrada" });
        }
        
        return res.status(200).json({
            message: "Status da mesa atualizado com sucesso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar status da mesa",
            error: error.message
        });
    }
});

app.delete('/api/mesas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const mesaDeletada = await mesas.delete(id);
        
        if (!mesaDeletada) {
            return res.status(404).json({ 
                message: "Mesa não encontrada" 
            });
        }
        
        console.log("Mesa deletada com ID:", id);
        
        return res.status(200).json({
            message: "Mesa deletada com sucesso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao deletar mesa",
            error: error.message
        });
    }
});

// ==================== ROTAS DE PRATOS ====================

app.post('/api/pratos', async (req, res) => {
    try {
        const { nome_prato, descricao, preco, categoria, imagem, tipo_imagem } = req.body;
        const pratoCriado = await pratos.create(nome_prato, preco, categoria, imagem, tipo_imagem, descricao);
        
        console.log("Prato criado:", pratoCriado);
        
        return res.status(201).json({
            message: "Prato criado com sucesso",
            prato: pratoCriado
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar prato",
            error: error.message
        });
    }
});

app.get('/api/pratos', async (req, res) => {
    try {
        const lista_pratos = await pratos.list();
        
        return res.status(200).json({
            message: "Pratos listados com sucesso",
            pratos: lista_pratos
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao listar pratos",
            error: error.message
        });
    }
});

app.get('/api/pratos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const prato = await pratos.getById(id);
        
        if (!prato) {
            return res.status(404).json({ message: "Prato não encontrado" });
        }
        
        return res.status(200).json(prato);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar prato",
            error: error.message
        });
    }
});

app.put('/api/pratos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome_prato, descricao, preco, categoria, imagem, tipo_imagem } = req.body;
        
        const atualizado = await pratos.update(id, nome_prato, preco, categoria, imagem, tipo_imagem, descricao);
        
        if (!atualizado) {
            return res.status(404).json({ message: "Prato não encontrado" });
        }
        
        return res.status(200).json({
            message: "Prato atualizado com sucesso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar prato",
            error: error.message
        });
    }
});

app.delete('/api/pratos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pratoDeletado = await pratos.delete(id);
        
        if (!pratoDeletado) {
            return res.status(404).json({ 
                message: "Prato não encontrado" 
            });
        }
        
        console.log("Prato deletado com ID:", id);
        
        return res.status(200).json({
            message: "Prato deletado com sucesso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao deletar prato",
            error: error.message
        });
    }
});

// ==================== ROTAS DE PEDIDOS ====================

app.post('/api/pedidos', async (req, res) => {
    try {
        const { id_mesa, id_prato, quantidade_unidade, nome_cliente, observacao } = req.body;
        
        const pedidoCriado = await pedidos.create(id_mesa, id_prato, quantidade_unidade, nome_cliente, observacao);
        
        console.log("Pedido criado:", pedidoCriado);
        
        return res.status(201).json({
            message: "Pedido criado com sucesso",
            pedido: pedidoCriado
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar pedido",
            error: error.message
        });
    }
});

app.get('/api/pedidos', async (req, res) => {
    try {
        const lista_pedidos = await pedidos.list();
        
        return res.status(200).json({
            message: "Pedidos listados com sucesso",
            pedidos: lista_pedidos
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao listar pedidos",
            error: error.message
        });
    }
});

app.get('/api/pedidos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pedido = await pedidos.getById(id);
        
        if (!pedido) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
        
        return res.status(200).json(pedido);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar pedido",
            error: error.message
        });
    }
});

app.get('/api/pedidos/mesa/:id_mesa', async (req, res) => {
    try {
        const id_mesa = req.params.id_mesa;
        const pedidosMesa = await pedidos.getByMesa(id_mesa);
        
        return res.status(200).json({
            message: "Pedidos da mesa listados com sucesso",
            pedidos: pedidosMesa
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar pedidos da mesa",
            error: error.message
        });
    }
});

app.put('/api/pedidos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { id_mesa, id_prato, quantidade_unidade, nome_cliente, observacao } = req.body;
        
        const atualizado = await pedidos.update(id, id_mesa, id_prato, quantidade_unidade, nome_cliente, observacao);
        
        if (!atualizado) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
        
        return res.status(200).json({
            message: "Pedido atualizado com sucesso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar pedido",
            error: error.message
        });
    }
});

app.put('/api/pedidos/:id/quantidade', async (req, res) => {
    try {
        const id = req.params.id;
        const { quantidade_unidade } = req.body;
        
        const atualizado = await pedidos.updateQuantidade(id, quantidade_unidade);
        
        if (!atualizado) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
        
        return res.status(200).json({
            message: "Quantidade do pedido atualizada com sucesso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar quantidade do pedido",
            error: error.message
        });
    }
});

app.get('/api/mesas/:id/total', async (req, res) => {
    try {
        const id_mesa = req.params.id;
        const total = await pedidos.getTotalMesa(id_mesa);
        
        return res.status(200).json({
            message: "Total da mesa calculado com sucesso",
            id_mesa,
            total
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao calcular total da mesa",
            error: error.message
        });
    }
});

app.get('/api/pratos/categoria/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;
        const pratosPorCategoria = await pratos.getByCategoria(categoria);
        
        return res.status(200).json({
            message: "Pratos listados com sucesso",
            categoria,
            pratos: pratosPorCategoria
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao listar pratos por categoria",
            error: error.message
        });
    }
});

app.delete('/api/pedidos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pedidoDeletado = await pedidos.delete(id);
        
        if (!pedidoDeletado) {
            return res.status(404).json({ 
                message: "Pedido não encontrado" 
            });
        }
        
        console.log("Pedido deletado com ID:", id);
        
        return res.status(200).json({
            message: "Pedido deletado com sucesso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao deletar pedido",
            error: error.message
        });
    }
});

// ==================== ROTAS PARA SERVIR AS PÁGINAS ====================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});

app.get('/mesas', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/mesas.html'));
});

app.get('/pratos', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/pratos.html'));
});

app.get('/add-pratos', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/addPratos.html'));
});

app.listen(port, function(){
    console.log("Servidor iniciado na porta " + port);
    console.log("Acesse: http://localhost:" + port);
});

export { app };
