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
    return res.send();
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
    artistService.on(artistService.events.CREATE_ARTIST, data => {
        return res.send(data);
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
    return res.send();
});

//getAllAuctionBids
app.get('/api/customers/:id/auction-bids', (req, res) => {
    return res.send();
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
    return res.send();
});

//createNewAuction
app.post('/api/auctions', (req, res) => {
    const auction = req.body;
    const auctionService = new AuctionService();
    auctionService.on(auctionService.events.CREATE_AUCTION, data => {
      return res.send(201);
    })
    auctionService.on(auctionService.events.CREATE_AUCTION_ERROR, err => {
      return res.send(412);
    })
    auctionService.on(auctionService.events.ART_ID_ERROR, err => {
      return res.send(400);
    })
    auctionService.createAuction(auction);
});

//getAllBidsForAuction
app.get('/api/auctions/:id/bids', (req, res) => {
    return res.send();
});

//createNewBidOnAuction
app.post('/api/auctions/:id/bids', (req, res) => {
    return res.send();
});





app.listen(port, () => {
    console.log(`listening on port ${port} !`);
})
