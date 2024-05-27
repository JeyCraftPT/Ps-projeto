const express = require('express');
const Montagem = require('../Models/montModel');
const Pecas = require('../Models/pecasModel');
const montagem = express.Router();


// Criar uma nova montagem
montagem.post('/montagens', async (req, res) => {
    try {
      const novaMontagem = new Montagem(req.body);
      const montagemSalva = await novaMontagem.save();
      

      for(const item of novaMontagem.pecas){
        const peca = await Peca.findById(item.peca);
        if (!peca){
          throw new error(`Peça com ID ${item.peca} não encontrada.`);
        }
        if (peca.stock < item.quantity) {
            throw new Error(`Estoque insuficiente para a peça ${peca.name}.`);
        }
      }
    
      for (const item of novaMontagem.pecas) {
        const peca = await Peca.findById(item.peca);
        peca.quantity -= item.quantity;
        await peca.save({ session });
        
      } 
      res.status(201).send(montagemSalva);
    }
     
       catch (error) {
      res.status(400).send(error);
    }
  });
  
// Listar todas as montagens
montagem.get('/montagens', async (req, res) => {
    try {
      const montagens = await Montagem.find().populate('pecas.peca');
      res.status(200).send(montagens);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
// Buscar uma montagem por ID
montagem.get('/montagens/:id', async (req, res) => {
    try {
      const montagem = await Montagem.findById(req.params.id).populate('pecas.peca');
      if (!montagem) {
        return res.status(404).send({ message: 'Montagem não encontrada' });
      }
      res.status(200).send(montagem);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
// Atualizar uma montagem por ID
montagem.put('/montagens/:id', async (req, res) => {
    try {
      const montagem = await Montagem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate('pecas.peca');
      if (!montagem) {
        return res.status(404).send({ message: 'Montagem não encontrada' });
      }
      res.status(200).send(montagem);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
  // Deletar uma montagem por ID
montagem.delete('/montagens/:id', async (req, res) => {
    try {
      const montagem = await Montagem.findByIdAndDelete(req.params.id);
      if (!montagem) {
        return res.status(404).send({ message: 'Montagem não encontrada' });
      }
      res.status(200).send({ message: 'Montagem deletada com sucesso' });
    } catch (error) {
      res.status(500).send(error);
    }
});


module.exports = montagem;



