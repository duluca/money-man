"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util_1 = require("util");
const bank_1 = require("./models/bank");
const readFileAsync = util_1.promisify(fs.readFile);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataString = yield readFileAsync('./data.json', { encoding: 'utf8' });
        const data = JSON.parse(dataString);
        let bank = new bank_1.Bank(data.accounts, data.income, data.payments);
        bank.runThisMonth();
        bank.printAccounts();
    });
}
run();
//# sourceMappingURL=index.js.map