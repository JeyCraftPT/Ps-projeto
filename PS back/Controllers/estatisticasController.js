const express = require('express');
const estatisticas = express.Router();
const Montagem = require('../Models/montModel');
const Peca = require('../Models/pecasModel.js');

// Obter a contagem total de peças no estoque
estatisticas.get('/totalpecas/total-stock', async (req, res) => {
    try {
        const totalStock = await Peca.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$stock" }
                }
            }
        ]);

        const total = totalStock[0] ? totalStock[0].total : 0;

        res.status(200).send({ totalStock: total });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// Obter a contagem total de montagens
estatisticas.get('/montagens/total', async (req, res) => {
    try {
        console.log('Iniciando contagem de montagens...');
        const totalMontagens = await Montagem.countDocuments();
        console.log(`Total de montagens: ${totalMontagens}`);
        res.status(200).send({ totalMontagens });
    } catch (error) {
        console.error('Erro ao contar montagens:', error);
        res.status(500).send({ message: error.message });
    }
});

module.exports = estatisticas;
