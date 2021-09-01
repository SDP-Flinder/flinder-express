const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {type: String, required: true},
  dob: {type: Date, required: true},
  createdDate: { type: Date, default: Date.now },
  role: {type: String, enum: ['admin', 'flat', 'flatee'], default: 'flatee'},
  
  //This is for accounts type flat
  address: { type: Object,
    properties:{
      street: {
        type: String,
      },
      suburb: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    }},
  description: {type: String},
  existingFlatmates: { type: Number}
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
  }
});

module.exports = mongoose.model('User', UserSchema);