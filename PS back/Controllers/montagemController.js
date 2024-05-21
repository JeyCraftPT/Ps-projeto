const express = require('express');
const Montagem = require('../Models/montModel');
const montagem = express.Router();


montagem.get('/utilizador/montagem', async (req, res) => {    
    try {
      const mont = await Montagem.find();
      res.json(mont);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro a mostrar montagem!');
    }
  });

montagem.get('/utilizador/montagem/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const mont = await Montagem.find();
        const index = mont.length;

        if (isNaN(id) || id < 0 || id >= index) {
            res.status(404).json({ error: 'O id da montagem precisa ser um número inteiro dentro dos limites da lista!' });
        } else {
            res.json(mont[id]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao mostrar montagem!");
    }
});


montagem.post ('/utilizador/montagem', async (req,res) =>{
    try{
        const novaMontagem = req.body; 
        const resultado = await r.create(novaMontagem); 
        res.json({mensagem :'Nova montagem adicionada'}); 
    }catch(error){
        console.error(error)
        res.status(500).send('Erro a acrescentar montagem!')
    }
});

montagem.put('/utilizador/montagem/:id', async (req,res) =>{
    const id = parseInt(req.params.id);
    const alterparam = req.body;
    const mont = await Montagem.find();
    const monti = mont[id];
    const index = mont.length;
    try {
        if (isNaN(id) || id < 0 || id >= index) {
            res.status(404).json({ error: 'O id da montagem precisa ser um número inteiro dentro dos limites da lista!' });
        } else {
            res.json({mensagem: "Montagem alterada"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro na atualização!')
    }
});

//Método que apaga dados numa posição

montagem.delete('/utilizador/montagem/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const mont = await Montagem.findOne({}, { skip: id });
    if (mont == null) { res.status(404).send("Não existem montagens já"); return;}
    console.log(mont);
    const result = await r.deleteOne({ _id: mont._id });
    const index = mont.length;

    try {
        // Verificações
        if (isNaN(id) || id < 0 || id >= index) {
            res.status(404).json({ error: 'O id da montagem precisa ser um número inteiro dentro dos limites da lista!' });
        } else {
            res.json({mensagem: "Dados apagados com sucesso"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro a apagar dados!');
    }
});



module.exports = montagem;



