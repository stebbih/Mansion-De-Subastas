const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;


module.exports = new Schema({
    artId: {type: ObjectId, required: true},
    minimumPrice: {type: Number, default: 1000},
    endDate: {type: Date, required: true},
    auctionWinner: {type: ObjectId}
});
