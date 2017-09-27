"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const chalk = require('chalk');
const log = console.log;
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
            return chalk `{red NEGATIVE BALANCE!}`;
        }
        else if (this.balance < this.minBalance) {
            return chalk `{yellow BELOW MINIMUM!}`;
        }
        return undefined;
    }
    get prettyBalance() {
        return this.getPrettyBalance(this.balance);
    }
    getPrettyBalance(balance) {
        let output = balance.toLocaleString('en-US', { style: 'currency', currency: 'USD',
            minimumFractionDigits: 2 }).padStart(10).slice(0, 10);
        if (balance < 0) {
            output = chalk.red(output);
        }
        else if (balance < this.minBalance) {
            output = chalk.yellow(output);
        }
        return output;
    }
    // private getAccountForPrint(e: ILedger) {
    //   if(e.targetAccount && e.sourceAccount) {
    //     return `${e.targetAccount} -> ${e.sourceAccount}`
    //   }
    //   return e.targetAccount || e.sourceAccount || '--'
    // }
    printLedger() {
        log(``);
        log(chalk `{bold ${this.name}}`);
        log(chalk.gray('-------------------------------------------------------------------------------'));
        this.accountLedger.forEach(e => {
            // if(e.note) {
            //   log(e.note)
            // }
            let category = e.category || '';
            log(chalk `${e.date.toISOString().slice(0, 10)}, {magenta ${event_1.EventType[e.type].padEnd(11).slice(0, 11)}}, {greenBright ${e.name.padEnd(20).slice(0, 20)}}, {green ${category.padEnd(20).slice(0, 20)}}, {bold ${this.getPrettyBalance(e.amount)}}`);
        });
        log(chalk.gray('-------------------------------------------------------------------------------'));
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map