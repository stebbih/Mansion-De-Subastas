// Here the web service should be setup and routes declared
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;

const ArtService = require('./services/artService');
const ArtistService = require('./services/ArtistService');

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
    return res.send();
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
    return res.send();
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
    return res.send();
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
