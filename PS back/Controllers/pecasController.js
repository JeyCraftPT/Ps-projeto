const express = require('express');
const peca = express.Router();
const Peca = require('../Models/pecasModel.js');

// Criar uma nova peça
peca.post('/pecas', async (req, res) => {
  try {
    const novaPeca = new Peca(req.body);
    const pecaSalva = await novaPeca.save();
    res.status(201).send(pecaSalva);
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

// Buscar uma peça por ID
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

// Atualizar uma peça por ID
peca.put('/pecas/:id', async (req, res) => {
  try {
    const peca = await Peca.findByIdAndUpdate(req.params.id, req.body, {
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

// Deletar uma peça por ID
peca.delete('/pecas/:id', async (req, res) => {
  try {
    const peca = await Peca.findByIdAndDelete(req.params.id);
    if (!peca) {
      return res.status(404).send({ message: 'Peça não encontrada' });
    }
    res.status(200).send({ message: 'Peça deletada com sucesso' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = peca;
