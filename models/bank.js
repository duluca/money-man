"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const recurringEvent_1 = require("./recurringEvent");
const dateComparator_1 = require("../utils/dateComparator");
const account_1 = require("./account");
class Bank {
    constructor(accounts, recurringEvents) {
        this.accounts = accounts.map(a => new account_1.Account(a));
        this.recurringEvents = recurringEvents.map(d => new recurringEvent_1.RecurringEvent(d.name, d.amount, d.type, d.category, d.recurrence, d.startDate, d.source, d.target));
    }
    getAccount(name) {
        let found = this.accounts.find(a => a.name.toLowerCase()
            === name.toLowerCase());
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
        const ledger = this.recurringEvents
            .map(re => re.toLedgerArray(firstDay, lastDay))
            .reduce(re => re);
        let startDate = new Date(firstDay);
        for (let currentDay = startDate; currentDay <= lastDay; startDate.setDate(startDate.getDate() + 1)) {
            this.runDay(ledger, currentDay);
        }
    }
    runDay(ledger, currentDay) {
        let entries = ledger.filter(e => dateComparator_1.compareDates(e.date, currentDay));
        entries.forEach(e => {
            if (e.sourceAccount) {
                let sourceAccount = this.getAccount(e.sourceAccount);
                switch (e.type) {
                    case event_1.EventType.Income:
                        sourceAccount.add(e.amount, e.date, e.type, e.name, e.category);
                        break;
                    case event_1.EventType.Expenditure:
                        sourceAccount.deduct(e.amount, e.date, e.type, e.name, e.category);
                        break;
                    case event_1.EventType.Transfer:
                        if (e.targetAccount) {
                            let targetAccount = this.getAccount(e.targetAccount);
                            sourceAccount.deduct(e.amount, e.date, e.type, e.name, e.category);
                            targetAccount.add(e.amount, e.date, e.type, e.name, e.category);
                        }
                }
            }
        });
    }
}
exports.Bank = Bank;
//# sourceMappingURL=bank.js.map