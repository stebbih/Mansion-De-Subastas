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
        Artist.find({}, (err, artists) => {
            if (err) { throw new Error(err); }
            this.emit(this.events.GET_ALL_ARTISTS, artists);
        });
    };

    getArtistById() {

    };

    createArtist( artist ) {
        Artist.create(artist, err => {
            if (err) { throw new Error(err); }
            this.emit(this.events.CREATE_ARTIST, 201)
        })
    };
};

module.exports = ArtistService;
