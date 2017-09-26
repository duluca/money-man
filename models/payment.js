"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recur_1 = require("./recur");
class Payment extends recur_1.Recurring {
    constructor(name, type, source, recurrenceString, startDate, amount) {
        super(recurrenceString);
        this.name = name;
        this.type = type;
        this.source = source;
        this.startDate = startDate;
        this.amount = amount;
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.js.map