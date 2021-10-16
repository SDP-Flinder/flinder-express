const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userID: { type: String},
    title: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});

matchListSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('notification', notificationSchema);