const EventEmitter = require('events');
const Customer = require('../data/db').Customer;

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
        // Your implementation goes here
        // Should emit a GET_CUSTOMER_BY_ID event when the data is available
    };

    getCustomerAuctionBids(customerId) {
        // Your implementation goes here
        // Should emit a GET_CUSTOMER_AUCTION_BIDS event when the data is available
    };

    createCustomer(customer) {
        Customer.create(customer, err => {
            if (err) { throw new Error(err); }
            this.emit(this.events.CREATE_CUSTOMER, '200');
        })
    };
};

module.exports = CustomerService;
