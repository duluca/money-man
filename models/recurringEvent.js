"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const RRule = require("rrule-alt");
const scheduler = require("../utils/scheduler");
class RecurringEvent extends event_1.Event {
    constructor(name, amount, typeName, category, recurrenceString, startDate, sourceAccount, targetAccount) {
        super(name, amount, typeName, category, sourceAccount, targetAccount);
        this.name = name;
        this.amount = amount;
        this.recurrenceString = recurrenceString;
        this.sourceAccount = sourceAccount;
        this.targetAccount = targetAccount;
        if (startDate && startDate instanceof String) {
            this.startDate = new Date(startDate);
        }
    }
    getNextDates(startDate, endDate) {
        const rule = RRule.fromString(this.recurrenceString);
        rule.options.dtstart = this.startDate || startDate;
        return scheduler.getNextDates(rule, startDate, endDate);
    }
    toLedgerArray(startDate, endDate) {
        return this.getNextDates(startDate, endDate).map(d => this.toLedger(d));
    }
}
exports.RecurringEvent = RecurringEvent;
//# sourceMappingURL=recurringEvent.js.map