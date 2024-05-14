'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
    Montagem Schema 
*/
const MontagemSchema = new Schema({
    name: [{
      type: String,
      required: true,
    }],

    desccription: [{
      type: String,
      required: true,
    }],

    pecas: [{
      type: Schema.Types.ObjectId,
      ref: 'Pecas',
      required: true,
    }],
  });
  
  const Montagem = mongoose.model('Montagem', MontagemSchema);
  
  export default Montagem