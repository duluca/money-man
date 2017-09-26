"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
class Account {
    constructor(account) {
        this.name = account.name;
        this.balance = account.balance;
        this.minBalance = account.minBalance;
        this.accountLedger = [{ name: this.name, amount: this.balance,
                sourceAccount: this.name, type: event_1.EventType.Balance, date: new Date() }];
    }
    add(amount, date, type, name, category) {
        this.balance = this.balance + amount;
        this.modHelper(date, type, name, category);
    }
    deduct(amount, date, type, name, category) {
        this.balance = this.balance - amount;
        this.modHelper(date, type, name, category);
    }
    modHelper(date, type, name, category) {
        this.accountLedger.push({
            sourceAccount: this.name,
            date: date, name: name, amount: this.balance, type: type,
            category: category, note: this.checkWarnings()
        });
    }
    checkWarnings() {
        if (this.balance < 0) {
            return `NEGATIVE BALANCE!`;
        }
        else if (this.balance < this.minBalance) {
            return `BELOW MINIMUM!`;
        }
        return undefined;
    }
    get prettyBalance() {
        return this.getPrettyBalance(this.balance);
    }
    getPrettyBalance(balance) {
        return balance.toLocaleString('en-US', { style: 'currency', currency: 'USD',
            minimumFractionDigits: 2 });
    }
    printLedger() {
        console.log(`Name: ${this.name}`);
        console.log(`-------------------------------`);
        this.accountLedger.forEach(e => {
            if (e.note) {
                console.log(e.note);
            }
            console.log(`${e.date.toLocaleDateString()}, ${e.name}, ${e.type},
        ${this.getPrettyBalance(e.amount)}`);
        });
        console.log(`-------------------------------`);
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map