const EventEmitter = require('events');
const Artist = require('../data/db').Artist;

class ArtistService extends EventEmitter {
    constructor() {
        super();
        this.events = {
            GET_ALL_ARTISTS: 'GET_ALL_ARTISTS',
            GET_ARTIST_BY_ID: 'GET_ARTIST_BY_ID',
            CREATE_ARTIST: 'CREATE_ARTIST'
        };
    }
    getAllArtists() {
        // Your implementation goes here
        // Should emit a GET_ALL_ARTISTS event when the data is available
    };

    getArtistById(id) {
        // Your implementation goes here
        // Should emit a GET_ARTIST_BY_ID event when the data is available
        Artist.findById(id, (err, artist) => {
          if (err) { throw new Error(err); }
          console.log(artist);
          this.emit(this.events.GET_ARTIST_BY_ID, artist);
        })
    };

    createArtist() {
        // Your implementation goes here
        // Should emit a CREATE_ARTIST event when the data is available
    };
};

module.exports = ArtistService;
