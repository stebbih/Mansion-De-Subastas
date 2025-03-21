const EventEmitter = require('events');
const Customer = require('../data/db').Customer;
const AuctionBid = require('../data/db').AuctionBid;

class CustomerService extends EventEmitter {
    constructor() {
        super();
        this.events = {
            GET_ALL_CUSTOMERS: 'GET_ALL_CUSTOMERS',
            GET_CUSTOMER_BY_ID: 'GET_CUSTOMER_BY_ID',
            GET_CUSTOMER_AUCTION_BIDS: 'GET_CUSTOMER_AUCTION_BIDS',
            CREATE_CUSTOMER: 'CREATE_CUSTOMER'
        };
    }

    getAllCustomers() {
        Customer.find({}, (err, customers) => {
            if (err) { throw new Error(err); }
            this.emit(this.events.GET_ALL_CUSTOMERS, customers);
        });
    };

    getCustomerById(id) {
        Customer.findById(id, (err, customers) => {
          if (err) { throw new Error(err); }
          this.emit(this.events.GET_CUSTOMER_BY_ID, customers);
        })
    };

    getCustomerAuctionBids(customerId) {
        // Your implementation goes here\
        // Should emit a GET_CUSTOMER_AUCTION_BIDS event when the data is available
                         
        AuctionBid.find({customerId: customerId}, (err, auctions) => {
          // console.log(auctions);
        console.log(customerId);
        if (err) { throw new Error(err); }
        this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, auctions);
      })
    };

    createCustomer(customer) {
        Customer.create(customer, err => {
            if (err) { throw new Error(err); }
            this.emit(this.events.CREATE_CUSTOMER);
        })
    };
};

module.exports = CustomerService;
