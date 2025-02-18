// Here the web service should be setup and routes declared
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;

const ArtService = require('./services/artService');
const ArtistService = require('./services/artistService');
const AuctionService = require('./services/auctionService');
const CustomerService = require('./services/customerService');

app.use(bodyParser.json());

//getAllArts
app.get('/api/arts', (req, res)  => {
    const artService = new ArtService();
    artService.on(artService.events.GET_ALL_ARTS, data => {
        return res.json(data);
    })
    artService.getAllArts();
});

//getArtsById
app.get('/api/arts/:id', (req, res) => {
  const id = req.params.id;
    const artService = new ArtService();
    artService.on(artService.events.GET_ART_BY_ID, data => {
      return res.json(data);
    })
    artService.getArtById(id);
});

//createNewArts
app.post('/api/arts', (req, res) => {
  const art = req.body;
  const artService = new ArtService();
  artService.on(artService.events.CREATE_ART, () => {
      return res.send(201);
  });
  artService.on(artService.events.CREATE_ART_ERROR, () => {
    return res.send(400);
  })
  artService.createArt(art);
});

//getAllArtists
app.get('/api/artists', (req, res) => {
    const artistService = new ArtistService();
    artistService.on(artistService.events.GET_ALL_ARTISTS, data =>{
        return res.json(data);
    });
    artistService.getAllArtists();
})

//getArtistById
app.get('/api/artists/:id', (req, res) => {
  const id = req.params.id;
  const artistService = new ArtistService();
  artistService.on(artistService.events.GET_ARTIST_BY_ID, data => {
    return res.json(data);
  })
  artistService.getArtistById(id);
});

//createNewArtist
app.post('/api/artists', (req, res) => {
    const artist = req.body;
    const artistService = new ArtistService();
    artistService.on(artistService.events.CREATE_ARTIST, () => {
        return res.send(201);
    });
    artistService.on(artistService.events.CREATE_ARTIST_ERROR, () => {
      return res.sendStatus(412);
    });
    artistService.createArtist(artist);
});

//getAllCustomers
app.get('/api/customers', (req, res)  => {
  const customerService = new CustomerService();
  customerService.on(customerService.events.GET_ALL_CUSTOMERS, data =>{
      return res.json(data);
  });
  customerService.getAllCustomers();
});

//getCustomersById
app.get('/api/customers/:id', (req, res) => {
  const id = req.params.id;
  const customerService = new CustomerService();
  customerService.on(customerService.events.GET_CUSTOMER_BY_ID, data => {
    return res.json(data);
  })
  customerService.getCustomerById(id);
});

//createNewCustomer
app.post('/api/customers', (req, res) => {
  const customer = req.body;
  const customerService = new CustomerService();
  customerService.on(customerService.events.CREATE_CUSTOMER, data => {
      return res.send(data);
  });
  customerService.createCustomer(customer);
});

//getAllAuctionBids
app.get('/api/customers/:id/auction-bids', (req, res) => {
    const customerService = new CustomerService();
    const customer = req.params.id;
    customerService.on(customerService.events.GET_CUSTOMER_AUCTION_BIDS, data => {
      return res.json(data);
    })
    customerService.getCustomerAuctionBids(customer);
});

//getAllAuction
app.get('/api/auctions', (req, res) => {
  const auctionService = new AuctionService();
  auctionService.on(auctionService.events.GET_ALL_AUCTIONS, data =>{
      return res.json(data);
  });
  auctionService.getAllAuctions();
});

//getAuctionsById
app.get('/api/auctions/:id', (req, res) => {
  const id = req.params.id;
  const auctionService = new AuctionService();
  auctionService.on(auctionService.events.GET_AUCTION_BY_ID, data => {
    return res.json(data);
  })
  auctionService.getAuctionById(id);
});

//getAuctionWinner
app.get('/api/auctions/:id/winner', (req, res) => {

// should return the customer which holds the highest bid. If the auction had no bids, it
// should return a status code 200 (OK) with the message: ‘This auction had no bids.’.
  const id = req.params.id;
  const auctionService = new AuctionService();
  auctionService.on(auctionService.events.AUCTION_HAS_NOT_EXPIRED, () => {
    return res.send(409);
  });
  auctionService.on(auctionService.events.AUCTION_HAS_NO_BIDS, () => {
    return res.send(data);
  });
  auctionService.on(auctionService.events.GET_AUCTION_WINNER, data => {
    return res.json(data);
  });
  auctionService.on(auctionService.events.AUCTION_ERROR, () => {
    return res.send(400);
  })
  auctionService.getAuctionWinner(id);


});

//createNewAuction
app.post('/api/auctions', (req, res) => {
    const auction = req.body;
    const auctionService = new AuctionService();
    auctionService.on(auctionService.events.CREATE_AUCTION, () => {
      return res.send(201);
    })
    auctionService.on(auctionService.events.CREATE_AUCTION_ERROR, () => {
      return res.send(412);
    })
    auctionService.on(auctionService.events.ART_ID_ERROR, () => {
      return res.send(400);
    })
    auctionService.createAuction(auction);
});

//getAllBidsForAuction
app.get('/api/auctions/:id/bids', (req, res) => {
  // Gets all auction bids associated with an auction
  const id = req.params.id;
  const auctionService = new AuctionService();
  auctionService.on(auctionService.events.GET_AUCTION_BIDS_WITHIN_AUCTION, data => {
    return res.json(data);
  });
  auctionService.on(auctionService.events.GET_AUCTION_BIDS_WITHIN_AUCTION_ERROR, () => {
    return res.send(400);
  })
  auctionService.getAuctionBidsWithinAuction(id);
});

//createNewBidOnAuction
app.post('/api/auctions/:id/bids', (req, res) => {
  // Creates a new auction bid (see how model should
  // look like in Model section). Auction bids must be higher than the minimum price and
  // must also be higher than the current highest bid. If the auction bid price is lower than
  // the minimum price or current highest bid, the web service should return a status code
  // 412 (Precondition failed). If the auction has already passed its end date, the web
  // service should return a status code 403 (Forbidden). As a side-effect the
  // auctionWinner property in the Auction schema should be updated to the latest
  // highest bidder.
  const bid = req.body;
  const auctionService = new AuctionService();
  auctionService.on(auctionService.events.AUCTION_ERROR, () => {
    return res.send(412);
  });
  auctionService.on(auctionService.events.PLACE_NEW_BID, () => {
    return res.send(201);
  });
  auctionService.on(auctionService.events.AUCTION_HAS_EXPIRED, () => {
    return res.send(403);
  })
  auctionService.placeNewBid(bid);

});





app.listen(port, () => {
    console.log(`listening on port ${port} !`);
})
