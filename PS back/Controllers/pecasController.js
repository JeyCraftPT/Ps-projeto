const express = require('express');
const peca = express.Router();
const Peca = require('../Models/pecasModel.js');

//Adiconar peça
peca.post('/pecas', async (req, res) => {
  try {
    const novaPeca = new Peca(req.body);
    const {name} = req.body; 
    const check = await Peca.findOne({ name: name });
    if (check) {
      res.json('Peça já existe, utilizar o put para dar update ao stock');
    }
    else{  
      novaPeca.stock = req.body.stock || 0; // Verificar que o stock está preparado
      const pecaSalva = await novaPeca.save();
      res.status(201).send(pecaSalva);
    } 

  } catch (error) {
    res.status(400).send(error);
  }
});

// Listar todas as peças
peca.get('/pecas', async (req, res) => {
  try {
    const pecas = await Peca.find();
    res.status(200).send(pecas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Mostrar peça por ID
peca.get('/pecas/:id', async (req, res) => {
  try {
    const peca = await Peca.findById(req.params.id);
    if (!peca) {
      return res.status(404).send({ message: 'Peça não encontrada' });
    }
    res.status(200).send(peca);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Atualizar peça por ID
peca.put('/pecas/:id', async (req, res) => {
  try {
    const peca = await Peca.findByIdAndUpdate(req.params.id, { stock: req.body.stock }, {
      new: true,
      runValidators: true,
    });
    if (!peca) {
      return res.status(404).send({ message: 'Peça não encontrada' });
    }
    res.status(200).send(peca);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar uma peça por ID
peca.delete('/pecas/:id', async (req, res) => {
  try {
    const peca = await Peca.findByIdAndDelete(req.params.id);
    if (!peca) {
      return res.status(404).send({ message: 'Peça não encontrada' });
    }
    res.status(200).send({ message: 'Peça eliminada com sucesso' });
  } catch (error) {
    res.status(500).send(error);
  }
});

peca.post('/pecas/:id/add-stock', async (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).send({ message: 'Quantidade inválida.' });
  }

  try {
    const peca = await Peca.findById(req.params.id);
    if (!peca) {
      return res.status(404).send({ message: 'Peça não encontrada.' });
    }

    peca.stock += amount;
    const updatedPeca = await peca.save();

    res.status(200).send(updatedPeca);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = peca;
