'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
    User Schema
*/
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema)


export default User