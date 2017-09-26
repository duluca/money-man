"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor(account) {
        this.name = account.name;
        this.balance = account.balance;
        this.minBalance = account.minBalance;
        this.ledger = [{ name: this.name, amount: this.balance, date: new Date() }];
    }
    modBalance(amount, date, name, type) {
        this.balance = this.balance + amount;
        this.ledger.push({
            date: date, name: name, amount: this.balance, type: type, note: this.checkWarnings()
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
        return balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
    }
    printLedger() {
        console.log(`Name: ${this.name}`);
        console.log(`-------------------------------`);
        this.ledger.forEach(e => {
            if (e.note) {
                console.log(e.note);
            }
            console.log(`${e.date.toLocaleDateString()}, ${e.name}, ${e.type}, ${this.getPrettyBalance(e.amount)}`);
        });
        console.log(`-------------------------------`);
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map