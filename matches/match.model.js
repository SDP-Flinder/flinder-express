const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchListSchema = new Schema({
    flateeUsername: { type: String },
    flatUsername: { type: String },
    matchedDate: { type: Date, default: null }, //only when matchState is 'matched', then update the matchedDate from null
    //to Date.now
    matchState: { type: String, enum: ['no-match', 'flatee-pending', 'flat-pending', 'matched'], default: 'no-match' },
});

matchListSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('matchList', matchListSchema);
//updated 12:25pm Thursday