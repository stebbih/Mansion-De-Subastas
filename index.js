// Here the web service should be setup and routes declared
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;

const ArtService = require('./services/artService');
const ArtistService = require('./services/artistService');
const AuctionService = require('./services/auctionService');

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
app.get('/api/artist', (req, res) => {
    return res.send();
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
    return res.send();
});

//getAllCustomers
app.get('/api/customers', (req, res)  => {
    return res.send();
});

//getCustomersById
app.get('/api/customers/:id', (req, res) => {
    return res.send();
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
    return res.send();
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
    return res.send();
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
