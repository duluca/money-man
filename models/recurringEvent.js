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
        this.startDate = startDate;
        this.sourceAccount = sourceAccount;
        this.targetAccount = targetAccount;
        this.recurrence = RRule.fromString(recurrenceString);
        if (this.startDate) {
            this.recurrence.options.dtstart = this.startDate;
        }
    }
    getNextDates(startDate, endDate) {
        return scheduler.getNextDates(this.recurrence, startDate, endDate);
    }
    toLedgerArray(startDate, endDate) {
        return this.getNextDates(startDate, endDate).map(d => this.toLedger(d));
    }
}
exports.RecurringEvent = RecurringEvent;
//# sourceMappingURL=recurringEvent.js.map