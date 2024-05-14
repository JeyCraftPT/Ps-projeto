'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
    User Schema
*/
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'A username is required']
  },
  hashPassword: {
    type: String,
    required: [true, 'A password is required']
  },
});

const User = mongoose.model('User', UserSchema)


export default User