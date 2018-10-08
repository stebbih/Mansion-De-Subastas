const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

module.exports = new Schema({
    title: {type: String, required: true},
    artistId: {type: ObjectId, required: true},
    date: {type: Date, default: Date.now },
    images: {type: [String]},
    description: {type: String},
    isAuctionItem: {type: Boolean, default: false}
});
