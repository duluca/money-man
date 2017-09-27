"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventType;
(function (EventType) {
    EventType[EventType["Income"] = 0] = "Income";
    EventType[EventType["Expenditure"] = 1] = "Expenditure";
    EventType[EventType["Transfer"] = 2] = "Transfer";
    EventType[EventType["Balance"] = 3] = "Balance";
})(EventType = exports.EventType || (exports.EventType = {}));
class Event {
    constructor(name, amount, typeName, category, sourceAccount, targetAccount) {
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.sourceAccount = sourceAccount;
        this.targetAccount = targetAccount;
        this.type = EventType[typeName];
    }
    toLedger(occuranceDate) {
        return {
            date: occuranceDate,
            name: this.name,
            amount: this.amount,
            sourceAccount: this.sourceAccount,
            targetAccount: this.targetAccount,
            category: this.category,
            type: this.type
        };
    }
}
exports.Event = Event;
//# sourceMappingURL=event.js.map