const express = require('express');
const estatisticas = express.Router();
const Montagem = require('../Models/montModel.js');
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
estatisticas.get('/montagem/total', async (req, res) => {
    try {
        console.log('Iniciando contagem de montagens...');
        const totalMontagens = await Montagem.countDocuments();
        console.log(`Total de montagens: ${totalMontagens}`);
        res.status(200).send({ totalMontagens });
    } catch (error) {
        console.error('Erro ao contar montagens:', error); // Log de erro detalhado
        res.status(500).send({ message: error.message });
    }
});


// Obter a peça mais utilizada
estatisticas.get('/peca/mais-utilizada', async (req, res) => {
    try {
        const pecaMaisUtilizada = await Montagem.aggregate([
            { $unwind: "$pecas" },
            { $group: { _id: "$pecas.peca", totalUsos: { $sum: "$pecas.quantity" } } },
            { $sort: { totalUsos: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "pecas",
                    localField: "_id",
                    foreignField: "_id",
                    as: "peca"
                }
            },
            { $unwind: "$peca" },
            {
                $project: {
                    _id: 0,
                    peca: "$peca.name",
                    totalUsos: 1
                }
            }
        ]);

        if (pecaMaisUtilizada.length === 0) {
            return res.status(404).send({ message: 'Nenhuma peça encontrada.' });
        }

        res.status(200).send(pecaMaisUtilizada[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



// Obter a média de peças utilizadas por montagem
estatisticas.get('/estatisticas/pecas', async (req, res) => {
    try {
        const mediaPecasPorMontagem = await Montagem.aggregate([
            { $unwind: "$pecas" },
            { $group: { _id: "$_id", totalPecas: { $sum: "$pecas.quantity" } } },
            { $group: { _id: null, mediaPecas: { $avg: "$totalPecas" } } }
        ]);

        const media = mediaPecasPorMontagem[0] ? mediaPecasPorMontagem[0].mediaPecas : 0;
        res.status(200).send({ mediaPecasPorMontagem: media });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = estatisticas;

