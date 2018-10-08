const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

module.exports = new Schema({

    auctionId: {type: ObjectId, required: true},
    customerId:{type: ObjectId, required: true},
    price: {type: Number, required: true}
});
