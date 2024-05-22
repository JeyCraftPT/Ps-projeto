const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
    Pecas Schema
*/
const PecaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['helice', 'bateria', 'motores', 'camara'],
  },
  value: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Peca = mongoose.model('Pecas', PecaSchema);

module.exports = Peca;












/* const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

/*
    Pecas Schema

const PecaSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  type: {
      type: String,
      required: true,
      enum: ['helice', 'bateria', 'motores', 'camara'],
  },
  value: {
      type: Number,
      required: true,
  },
  timestamp: {
      type: Date,
      default: Date.now, //meter timestamp na montagem
  },
});



const Peca = mongoose.model('Pecas', PecasSchema)

module.exports = Peca; */