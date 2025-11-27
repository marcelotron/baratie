import { Mesas } from '../model/mesa.js';
import express from 'express';

const app = express();
const port = 3000;

const mesas = new Mesas();

//aqui processa o json no corpo da requisiçao
app.use(express.json());


app.post('/criar_mesa', (req, res) =>{
    const{ id, status } = req.body;

    const mesaCriada = mesas.create(id, status);
    console.log("mesa criada ", mesas.mesas);

    return res.status(200).json({
        message: "Mesa criada com sucesso"
    });
});

app.get('/mostrar_mesas', (req, res) => {
    const lista_mesa = mesas.list();

    if(lista_mesa.length === 0){
        console.log("Mesas vazias");
        return res.status(200).json({
            message: "Mesas vazias",
            mesas: []
        });
    }
    else{
        console.log(lista_mesa);
        return res.status(200).json({
            message: "Mesas listadas com sucesso",
            mesas: lista_mesa
        });
    }
});

app.get('/mostrar_mesas/:id', (req, res) => {
    const id = req.params.id;
    const mesa = mesas.mesas.find(m => m.id == id);
    
    if (!mesa) {
        return res.status(404).json({ message: "Mesa não encontrada" });
    }
    
    return res.status(200).json(mesa);
});

app.post('/criar_pedido', (req, res) => {
    const {prato, preco, mesa} = req.body;
      return res.status(201).json({
        message: "Pedido criado com sucesso",
        pedido: { prato, preco, mesa }
    });
});

app.delete('/deletar_mesa/:id', (req, res) => {
    const id = req.params.id;
    
    const mesaDeletada = mesas.delete(id);
    
    if (!mesaDeletada) {
        return res.status(404).json({ 
            message: "Mesa não encontrada" 
        });
    }
    
    console.log("Mesa deletada. Mesas restantes: ", mesas.mesas);
    
    return res.status(200).json({
        message: "Mesa deletada com sucesso",
        mesas_restantes: mesas.mesas
    });
});



app.listen(port, function(){
    console.log("Server.js iniciado ouvindo na porta " + port);
})
