'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
    Pecas Schema
*/
var PecasSchema = new Schema({
  helice: {
    value: {
      type: Number,
      required: false
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  bateria: {
    value: {
      type: Number,
      required: false
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  motores: {
    value: {
      type: Number,
      required: false
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
<<<<<<< Updated upstream
  chassi: {
    value: {
      type: Number,
      required: false
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
=======
  camara : {
    type: Number,  
    unique : false,
    required : false,
  },
    
>>>>>>> Stashed changes
});


const Peca = mongoose.model('Pecas', PecasSchema)

export default Peca