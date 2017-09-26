"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recur_1 = require("../../models/recur");
const dateArrayMatcher = {
    toBeDateArray: function () {
        return {
            compare: function (expected, actual) {
                let messages = [];
                let arraysAreSame = true;
                for (let i = 0; i < actual.length; i++) {
                    if (!recur_1.compareDates(actual[i], expected[i])) {
                        messages.push(`Expected: ${expected[i]} doesn't match Actual: ${actual[i]}`);
                        arraysAreSame = false;
                    }
                }
                return {
                    pass: arraysAreSame,
                    message: messages.join(',')
                };
            }
        };
    }
};
exports.dateArrayMatcher = dateArrayMatcher;
//# sourceMappingURL=dateArray.matcher.js.map