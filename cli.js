#!/usr/bin/env node 

const args = require('minimist')(process.argv.slice(2))._;
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
    server: 'wss://s1.ripple.com' // Public rippled server
});

class User {
    constructor(args) {
        this.args = args;
    }

    path() {
        switch (this.args[0]) {
            case 'account-info': 
                this.getAccountInfo(this.args[1]);
                break;
            case 'get-balance':
                this.getBalance(this.args[1]);
                break;
            default:
                console.log('Please enter a valid command')
        }
    }

    getAccountInfo(address) {
        api.connect().then(() => {
            /* begin custom code ------------------------------------ */
            const myAddress = address;

            console.log('getting account info for', myAddress);
            return api.getAccountInfo(myAddress);

        }).then(info => {
            console.log(info);
            console.log('getAccountInfo done');

            /* end custom code -------------------------------------- */
        }).then(() => {
            return api.disconnect();
        }).then(() => {
            console.log('done and disconnected.');
        }).catch(console.error);
    }

    getBalance(address) {
        api.connect().then(() => {
            return api.getAccountInfo(address);
        }).then((info) => {
            console.log("Your balance: ", info.xrpBalance)
        }).then(() => {
            return api.disconnect();
        }).catch(console.error);
    }
}

let user = new User(args);
user.path()


'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn'