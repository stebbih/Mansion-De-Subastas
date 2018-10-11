EventEmitter = require('events');
const Auction = require('../data/db').Auction;
const Art = require('../data/db').Art;

class AuctionService extends EventEmitter {
	constructor() {
		super();
		this.events = {
			GET_ALL_AUCTIONS: 'GET_ALL_AUCTIONS',
			GET_AUCTION_BY_ID: 'GET_AUCTION_BY_ID',
			GET_AUCTION_WINNER: 'GET_AUCTION_WINNER',
			CREATE_AUCTION: 'CREATE_AUCTION',
			CREATE_AUCTION_ERROR: 'CREATE_ERROR',
			GET_AUCTION_BIDS_WITHIN_AUCTION: 'GET_AUCTION_BIDS_WITHIN_AUCTION',
			PLACE_NEW_BID: 'PLACE_NEW_BID',
			ART_ID_ERROR: 'ART_ID_ERROR'
		};
	}

	getAllAuctions() {
    Auction.find({}, (err, auctions) => {
      if (err) { throw new Error(err); }
      this.emit(this.events.GET_ALL_AUCTIONS, auctions);
    });
	};

	getAuctionById(id) {
    Auction.findById(id, (err, auction) => {
      if (err) { throw new Error(err); }
      console.log(auction);
      this.emit(this.events.GET_AUCTION_BY_ID, auction);
    })
	};

	getAuctionWinner(auctionId) {
		// Your implementation goes here
        // Should emit a GET_AUCTION_WINNER event when the data is available
	};

	createAuction(auction) {
		console.log(auction.artId);
		Art.findById(auction.artId, (err, art) => {
			if (err) { this.emit(this.events.ART_ID_ERROR); }
			if (art.isAuctionItem) {
				Auction.create(auction, err => {
						if (err) { this.emit(this.events.CREATE_AUCTION_ERROR); }
						this.emit(this.events.CREATE_AUCTION);
				});
			}
			else {
				this.emit(this.events.CREATE_AUCTION_ERROR);
			}
		})

	};

	getAuctionBidsWithinAuction(auctionId) {
		// Your implementation goes here
    // Should emit a GET_AUCTION_BIDS_WITHIN_AUCTION event when the data is available
	};

	placeNewBid(auctionId, customerId, price) {

		AuctionBid.create()

	};
};

module.exports = AuctionService;
