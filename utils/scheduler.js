"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biz = require('@date/business')({
    // use USA bank holidays
    holidays: require('@date/holidays-us').bank()
});
function getNextDates(rule, startDate, endDate, debug = false) {
    var resultsToReturn = [];
    try {
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
        result.forEach(r => {
            if (r && r >= startDate) {
                resultsToReturn.push(r);
            }
        });
        if (debug) {
            console.log('Filtered dates:');
            console.log(result);
        }
    }
    catch (ex) {
        console.log(ex);
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
//# sourceMappingURL=scheduler.js.map