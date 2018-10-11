EventEmitter = require('events');
const Auction = require('../data/db').Auction;
const Art = require('../data/db').Art;
const AuctionBid = require('../data/db').AuctionBid;
const Customer = require('../data/db').Customer;

class AuctionService extends EventEmitter {
	constructor() {
		super();
		this.events = {
			GET_ALL_AUCTIONS: 'GET_ALL_AUCTIONS',
			GET_AUCTION_BY_ID: 'GET_AUCTION_BY_ID',
			GET_AUCTION_WINNER: 'GET_AUCTION_WINNER',
			AUCTION_HAS_NO_BIDS: 'AUCTION_HAS_NO_BIDS',
			AUCTION_HAS_NOT_EXPIRED: 'AUCTION_HAS_NOT_EXPIRED',
			CREATE_AUCTION: 'CREATE_AUCTION',
			CREATE_AUCTION_ERROR: 'CREATE_ERROR',
			GET_AUCTION_BIDS_WITHIN_AUCTION: 'GET_AUCTION_BIDS_WITHIN_AUCTION',
			GET_AUCTION_BIDS_WITHIN_AUCTION_ERROR: 'GET_AUCTION_BIDS_WITHIN_AUCTION_ERROR',
			PLACE_NEW_BID: 'PLACE_NEW_BID',
			ART_ID_ERROR: 'ART_ID_ERROR',
			AUCTION_PRICE_ERROR: 'AUCTION_PRICE_ERROR',
			AUCTION_ERROR: 'AUCTION_ERROR',
			AUCTION_HAS_EXPIRED: 'AUCTION_HAS_EXPIRED'

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
		var today = new Date();
		console.log(today);
		Auction.findById(auctionId, (err, auction) => {
			if (err) { this.emit(this.events.AUCTION_ERROR); }
			console.log(auction.endDate);
			if (auction.endDate < today) {
				if (auction.auctionWinner === null) {
					this.emit(this.events.AUCTION_HAS_NO_BIDS);
				}
				else{
					Customer.findById(auction.auctionWinner, (err, winner) => {
						this.emit(this.events.GET_AUCTION_WINNER, winner);
					});
				}
			}
			else {
				this.emit(this.events.AUCTION_HAS_NOT_EXPIRED);
			}
		});
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
			AuctionBid.find({ auctionId: auctionId}, (err, bids) => {
				if (err) { this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION_ERROR); }
				this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION, bids);
			});
	};

	placeNewBid(theBid) {
		const price = theBid.price;
		const auctionId = theBid.auctionId;
		const customerId = theBid.customerId;
		let highestPrice = 0;
		const today = new Date();
		Auction.findById(auctionId, (err, auction) => {
				if (err) { this.emit(this.events.AUCTION_ERROR); }
				if (auction.endDate > today) { this.emit(this.events.AUCTION_HAS_EXPIRED); }
				else {
					if (price <= auction.price) { this.emit(this.events.AUCTION_ERROR); }
					AuctionBid.findById(auctionId, (err, bids) => {
							if (err) { this.emit(this.events.AUCTION_ERROR); }
							console.log(bids);
							if (bids === null) {
								AuctionBid.create({auctionId: auctionId, customerId: customerId, price: price}, err => {
									if (err) { this.emit(this.events.AUCTION_ERROR); }
									Auction.update({_id: auction._id}, { $set: {auctionWinner: customerId}}, err => { if (err) { this.emit(this.events.AUCTION_ERROR); }})
									this.emit(this.events.PLACE_NEW_BID);
								});
							}
							else {
								bids.forEach(bid => { if (bid.price > highestPrice) { highestPrice = bid.price } });
								if (highestPrice > price) { this.emit(this.events.AUCTION_ERROR); }
								AuctionBid.create({auctionId: auctionId, customerId: customerId, price: price}, err => {
									if (err) { this.emit(this.events.AUCTION_ERROR); }
									Auction.update({_id: auction._id}, { $set: {auctionWinner: customerId}}, err => { if (err) { this.emit(this.events.AUCTION_ERROR); }})
									this.emit(this.events.PLACE_NEW_BID);
								});
							}
					});
				}
		});
	};
};

module.exports = AuctionService;
