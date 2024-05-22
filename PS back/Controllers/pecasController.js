const express = require('express');
const router = express.Router();
const Montagem = require('../Models/montModel.js');
const Peca = require('../Models/pecasModel.js');

// GET all pecas from a montagem
peca.get('/utilizador/:idm/peca', async (req, res) => {
  try {
    const montagem = await Montagem.findById(req.params.id).populate('pecas.peca');
    if (!montagem) return res.status(404).send('Montagem não encontrada');
    res.json(montagem.pecas);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET specific peca from a montagem
peca.get('/utilizador/:idm/:idp', async (req, res) => {
  try {
    const montagem = await Montagem.findById(req.params.id).populate('pecas.peca');
    if (!montagem) return res.status(404).send('Montagem não encontrada');

    const peca = montagem.pecas.find(p => p.peca._id.toString() === req.params.id);
    if (!peca) return res.status(404).send('Peca não encontrada');

    res.json(peca);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST new peca to a montagem
peca.post('/utilizador/:idm/peca', async (req, res) => {
  try {
    const montagem = await Montagem.findById(req.params.id);
    if (!montagem) return res.status(404).send('Montagem não encontrada');

    const { pecaId, quantity } = req.body;
    const peca = await Peca.findById(id);
    if (peca.quantity < quantity) return res.status(400).send('Estoque insuficiente');

    peca.quantity -= quantity;
    await peca.save();

    montagem.pecas.push({ peca: pecaId, quantity });
    await montagem.save();

    res.status(201).json(montagem);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT update specific peca in a montagem
peca.put('/utilizador/:idm/:idp', async (req, res) => {
  try {
    const montagem = await Montagem.findById(req.params.id);
    if (!montagem) return res.status(404).send('Montagem não encontrada');

    const { quantity } = req.body;
    const pecaInMontagem = montagem.pecas.find(p => p.peca.toString() === req.params.id);
    if (!pecaInMontagem) return res.status(404).send('Peca não encontrada na montagem');

    const peca = await Peca.findById(req.params.id);
    if (!peca) return res.status(404).send('Peca não encontrada');

    
    res.json('Alteração sucedida');

    
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//////FIQUEI AQUI

// DELETE specific peca from a montagem
peca.delete('/utilizador/:idm/:idp', async (req, res) => {
  try {
    const montagem = await Montagem.findById(req.params.idm);
    if (!montagem) return res.status(404).send('Montagem não encontrada');

    const pecaInMontagem = montagem.pecas.find(p => p.peca.toString() === req.params.idp);
    if (!pecaInMontagem) return res.status(404).send('Peca não encontrada na montagem');

    const peca = await Peca.findById(req.params.idp);
    if (!peca) return res.status(404).send('Peca não encontrada');

    peca.quantity += pecaInMontagem.quantity;
    await peca.save();

    montagem.pecas.pull(pecaInMontagem._id);
    await montagem.save();

    res.json({ message: 'Peca removida com sucesso' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE all pecas from a montagem
peca.delete('/utilizador/:idm/peca', async (req, res) => {
  try {
    const montagem = await Montagem.findById(req.params.idm);
    if (!montagem) return res.status(404).send('Montagem não encontrada');

    for (const pecaInMontagem of montagem.pecas) {
      const peca = await Peca.findById(pecaInMontagem.peca);
      if (peca) {
        peca.quantity += pecaInMontagem.quantity;
        await peca.save();
      }
    }

    montagem.pecas = [];
    await montagem.save();

    res.json({ message: 'Todas as pecas foram removidas' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
