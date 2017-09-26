"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recur_1 = require("./recur");
const payment_1 = require("./payment");
const income_1 = require("./income");
const account_1 = require("./account");
class Bank {
    constructor(accounts, income, payments) {
        this.accounts = accounts.map(a => new account_1.Account(a));
        this.income = income.map(d => new income_1.Income(d.name, d.recurrence, d.amount, d.target));
        this.payments = payments.map(d => new payment_1.Payment(d.name, d.type, d.source, d.recurrence, d.startDate, d.amount));
    }
    getAccount(name) {
        let found = this.accounts.find(a => a.name.toLowerCase() === name.toLowerCase());
        if (!found) {
            throw `Account ${name} not found!`;
        }
        return found;
    }
    printBalances() {
        this.accounts.forEach(a => console.log(`Name: ${a.name} - Balance: ${a.prettyBalance}`));
    }
    printAccounts() {
        this.accounts.forEach(a => a.printLedger());
    }
    runThisMonth() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth();
        var firstDay = new Date(y, m, date.getDate());
        var lastDay = new Date(y, m + 2, 0);
        this.runSimulation(firstDay, lastDay);
    }
    runNextMonth() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        this.runSimulation(firstDay, lastDay);
    }
    runSimulation(firstDay, lastDay) {
        let ledger = [];
        this.income.forEach(i => {
            i.getNextDates(firstDay, lastDay).forEach(iDate => {
                ledger.push({ date: iDate, name: i.name, amount: i.amount, account: i.target, type: "Income" });
            });
        });
        this.payments.forEach(i => {
            i.getNextDates(firstDay, lastDay).forEach(iDate => {
                ledger.push({ date: iDate, name: i.name, amount: -i.amount, account: i.source, type: i.type });
            });
        });
        let startDate = new Date(firstDay);
        for (let i = startDate; i <= lastDay; startDate.setDate(startDate.getDate() + 1)) {
            this.runDay(ledger, i);
        }
    }
    runDay(ledger, date) {
        let entries = ledger.filter(e => recur_1.compareDates(e.date, date));
        entries.forEach(e => {
            if (e.account) {
                let account = this.getAccount(e.account);
                account.modBalance(e.amount, e.date, e.name, e.type);
            }
        });
    }
}
exports.Bank = Bank;
//# sourceMappingURL=bank.js.map