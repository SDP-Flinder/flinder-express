const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  username: { type: String, unique: true, required: true },
  photo: { type: String},
});

PhotoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
  }
});

module.exports = mongoose.model('Photo', PhotoSchema);