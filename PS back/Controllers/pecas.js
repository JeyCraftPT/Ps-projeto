const express = require('express');
const router = express.Router();
const pecaschema = require('../Models/pecasModel');
const montageschema = require('../Models/montModel')

router.get('/utilizador/:idm/peca', async (req, res) => {   
    const id = parseInt(req.params.id); 
    try {
      const peca = await pecaschema.find();
      res.json(peca);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro a mostrar montagem!');
    }
  });

  router.get('/utilizador/:idm/:idp', async (req, res) => {
    try {
        const idm = parseInt(req.params.id);
        const idp = parseInt(req.params.id);
        const mont = await montageschema.find();
        const index = mont.length;
        const peca = montageschema.pecaschema.find(peca => peca.id === idp);

        if (!peca) {
            return res.status(404).json({ error: 'Peça não encontrada na montagem!' });
        }

        if (isNaN(idm) || idm < 0 || idm >= index) {
            res.status(404).json({ error: 'O id da montagem precisa ser um número inteiro dentro dos limites da lista!' });
        } else {
            res.json(mont[id]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao mostrar montagem!");
    }
});


/* 
router.post ('/utilizador/montagem', async (req,res) =>{
    try{
        const novaMontagem = req.body; 
        const resultado = await r.create(novaMontagem); 
        res.json({mensagem :'Nova montagem adicionada'}); 
    }catch(error){
        console.error(error)
        res.status(500).send('Erro a acrescentar montagem!')
    }
});

router.put('/utilizador/montagem/:id', async (req,res) =>{
    const id = parseInt(req.params.id);
    const alterparam = req.body;
    const mont = await montageschema.find();
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

router.delete('/utilizador/montagem/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const mont = await montageschema.findOne({}, { skip: id });
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
}); */



