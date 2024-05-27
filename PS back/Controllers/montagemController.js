/* const express = require('express');
const Montagem = require('../Models/montModel');
const Pecas = require('../Models/pecasModel');
const montagem = express.Router();
const mongoose = require('mongoose');

/////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////

  montagem.post('/montagens', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const novaMontagem = new Montagem(req.body);
      console.log('Nova montagem:', novaMontagem);
  
      // Check stock for each part
      for (const item of novaMontagem.pecas) {
        const peca = await Peca.findById(item.peca).session(session);
        console.log('Checking stock for Peca:', peca);
        if (!peca) {
          throw new Error(`Peça com ID ${item.peca} não encontrada.`);
        }
        if (peca.stock < item.quantity) {
          throw new Error(`Estoque insuficiente para a peça ${peca.name}.`);
        }
      }
  
      // Deduct stock
      for (const item of novaMontagem.pecas) {
        const peca = await Peca.findById(item.peca).session(session);
        peca.stock -= item.quantity;
        await peca.save({ session });
        console.log(`Updated stock for Peca ${peca.name}: ${peca.stock}`);
      }
  
      const montagemSalva = await novaMontagem.save({ session });
      await session.commitTransaction();
      session.endSession();
      res.status(201).send(montagemSalva);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error creating montagem:', error);
      res.status(400).send({ message: error.message });
    }
  });


  ///
  
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
  ///////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////

montagem.delete('/montagens/:id', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const montagem = await Montagem.findById(req.params.id).session(session);
    if (!montagem) {
      return res.status(404).send({ message: 'Montagem não encontrada' });
    }

    // Return stock to inventory
    for (const item of montagem.pecas) {
      const peca = await Peca.findById(item.peca).session(session);
      if (peca) {
        peca.stock += item.quantity;
        await peca.save({ session });
      }
    }

    await montagem.deleteOne({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).send({ message: 'Montagem deletada com sucesso' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ message: error.message });
  }
});


module.exports = montagem;



 */

const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const Montagem = require('../Models/montModel');
const Peca = require('../Models/pecasModel'); // Ensure correct path and model name
const montagem = express.Router();

// Criar uma nova montagem
montagem.post('/montagens', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const novaMontagem = new Montagem(req.body);
    console.log('Nova montagem:', novaMontagem);

    // Check stock for each part
    for (const item of novaMontagem.pecas) {
      const peca = await Peca.findById(item.peca).session(session);
      console.log('Checking stock for Peca:', peca);
      if (!peca) {
        throw new Error(`Peça com ID ${item.peca} não encontrada.`);
      }
      if (peca.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para a peça ${peca.name}.`);
      }
    }

    // Deduct stock
    for (const item of novaMontagem.pecas) {
      const peca = await Peca.findById(item.peca).session(session);
      peca.stock -= item.quantity;
      await peca.save({ session });
      console.log(`Updated stock for Peca ${peca.name}: ${peca.stock}`);
    }

    const montagemSalva = await novaMontagem.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).send(montagemSalva);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating montagem:', error);
    res.status(400).send({ message: error.message });
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
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const montagem = await Montagem.findById(req.params.id).session(session);
    if (!montagem) {
      return res.status(404).send({ message: 'Montagem não encontrada' });
    }

    // Return stock to inventory
    for (const item of montagem.pecas) {
      const peca = await Peca.findById(item.peca).session(session);
      if (peca) {
        peca.stock += item.quantity;
        await peca.save({ session });
        console.log(`Returned stock for Peca ${peca.name}: ${peca.stock}`);
      }
    }

    await montagem.deleteOne({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).send({ message: 'Montagem deletada com sucesso' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ message: error.message });
  }
});

module.exports = montagem;
