const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
    Montagem Schema 
*/
const MontagemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pecas: [{
    peca: {
      type: Schema.Types.ObjectId,
      ref: 'Pecas',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  }],
  dataMontagem: {
    type: Date,
    default: Date.now
  }
});

const Montagem = mongoose.model('Montagem', MontagemSchema);

module.exports = Montagem;