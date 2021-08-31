const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  
});

MatchSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
  }
});

module.exports = mongoose.model('Match', MatchSchema);