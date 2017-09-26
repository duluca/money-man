"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RRule = require("rrule-alt");
var biz = require('@date/business')({
    // use USA bank holidays
    holidays: require('@date/holidays-us').bank()
});
class Recurring {
    constructor(recurrenceString, startDate) {
        this.startDate = startDate;
        this.recurrence = RRule.fromString(recurrenceString);
        if (this.startDate) {
            this.recurrence.options.dtstart = this.startDate;
        }
    }
    getNextDates(startDate, endDate) {
        return getNextDates(this.recurrence, startDate, endDate);
    }
}
exports.Recurring = Recurring;
function compareDates(a, b) {
    return a.toLocaleDateString() === b.toLocaleDateString();
}
exports.compareDates = compareDates;
function getNextDates(rule, startDate, endDate, debug = false) {
    if (debug) {
        console.log(`Start: ${startDate.toLocaleDateString()} - End: ${endDate.toLocaleDateString()}`);
    }
    var result = rule.between(startDate, endDate);
    if (debug) {
        console.log(rule.toText());
        console.log('Found dates:');
        console.log(result);
    }
    result = result.map(d => ensureBusinessDay(d));
    var resultsToReturn = [];
    result.forEach(r => {
        if (r && r >= startDate) {
            resultsToReturn.push(r);
        }
    });
    if (debug) {
        console.log('Filtered dates:');
        console.log(result);
    }
    return resultsToReturn;
}
exports.getNextDates = getNextDates;
function ensureBusinessDay(date) {
    if (date && !biz.isBusinessDay(date)) {
        date = biz.previousBusinessDay(date);
    }
    return date;
}
//# sourceMappingURL=recur.js.map