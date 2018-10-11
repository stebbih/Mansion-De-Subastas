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
        AuctionBid.find({ customerId }, (err, customer) => {
          if (err) { throw new Error(err); }
            console.log(customer);
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
