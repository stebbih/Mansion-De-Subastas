const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

module.exports = new Schema({
    images: [String],
    isAuctionItem: {type: Boolean, default: false},
    title: {type: String, required: true},
    artistId: {type: ObjectId, required: true},
    date: {type: Date, default: Date.now },
    description: {type: String}
});
