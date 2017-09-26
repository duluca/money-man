"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recur_1 = require("./recur");
class Income extends recur_1.Recurring {
    constructor(name, recurrenceString, amount, target) {
        super(recurrenceString);
        this.name = name;
        this.amount = amount;
        this.target = target;
    }
}
exports.Income = Income;
//# sourceMappingURL=income.js.map