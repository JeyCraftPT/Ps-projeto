'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/**
 * Pecas Schema
 */
var PecasSchema = new Schema({
  helice : {
    type: Number,
    unique : false,
    required : false,
  },
  bateria : {
    type: Number,
    unique : false,
    required : false,
  },
  motores : {
    type: Number,
    unique : false,
    required : false,
  },
  chassi : {
    type: Number,  
    unique : false,
    required : false,
  },
    
});

const Peca = mongoose.model('Pecas', PecasSchema)

export default Peca