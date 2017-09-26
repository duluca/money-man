"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateComparator_1 = require("../utils/dateComparator");
describe('compareDates', function () {
    it('should match when time component is different in the same timezone', () => {
        const a = new Date('2017-08-01T05:00:00Z');
        const b = new Date('2017-08-01T06:00:00Z');
        const isMatch = dateComparator_1.compareDates(a, b);
        expect(isMatch).toBeTruthy();
    });
    it('should fail when time component is changes actual date in the same timezone ', () => {
        const a = new Date('2017-08-01T00:00:00Z');
        const b = new Date('2017-08-01T06:00:00Z');
        const isMatch = dateComparator_1.compareDates(a, b);
        expect(isMatch).toBeFalsy();
    });
});
//# sourceMappingURL=dateComparatorSpec.js.map