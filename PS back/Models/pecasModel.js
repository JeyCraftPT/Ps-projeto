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
});


const Peca = mongoose.model('Pecas', PecasSchema)

export default Peca