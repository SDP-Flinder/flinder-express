const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  flat_id: { type: String, required: true },
  description: { type: String, required: true },
  utilities: { type: String, required: true },
  rent: { type: Number, required: true },
  rentUnits: { type: String, required: true },
  roomAvailable: { type: Date, required: true },
  active: { type: Boolean, required: true }
});

ListingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
  }
});

module.exports = mongoose.model('Listing', ListingSchema);