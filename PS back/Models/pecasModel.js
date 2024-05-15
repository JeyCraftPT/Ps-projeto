'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
    Pecas Schema
*/
const PecaSchema = new Schema({
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
      default: Date.now,
  },
});



const Peca = mongoose.model('Pecas', PecasSchema)

export default Peca