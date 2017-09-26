"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="matchers/dateArray.matcher.d.ts"/>
const scheduler = require("../utils/scheduler");
const RRule = require("rrule-alt");
const dateArray_matcher_1 = require("./matchers/dateArray.matcher");
describe('scheduler', function () {
    beforeEach(() => {
        jasmine.addMatchers(dateArray_matcher_1.dateArrayMatcher);
    });
    it('should ignore past dates', () => {
        const rule = RRule.fromString(`FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=15`);
        rule.options.dtstart = new Date('2017-08-01T05:00:00Z');
        const startDate = new Date('2017-09-01T05:00:00Z');
        const endDate = new Date('2017-12-31T05:00:00Z');
        const expectedDates = [new Date('2017-11-15T05:00:00Z')];
        const results = scheduler.getNextDates(rule, startDate, endDate);
        expect(expectedDates.length).toEqual(results.length);
        expect(expectedDates).toBeDateArray(results);
    });
    it('should schedule events that fall partially within date range', () => {
        const rule = RRule.fromString(`FREQ=YEARLY;BYMONTH=11,12,1,2,3,4;BYMONTHDAY=1`);
        rule.options.dtstart = new Date('2017-03-01T03:00:00Z');
        const startDate = new Date('2017-03-31T05:00:00Z');
        const endDate = new Date('2017-12-31T05:00:00Z');
        const expectedDates = [new Date('2017-03-31T05:00:00Z'), new Date('2017-11-01T05:00:00Z'), new Date('2017-12-01T05:00:00Z')];
        const results = scheduler.getNextDates(rule, startDate, endDate);
        expect(expectedDates.length).toEqual(results.length);
        expect(expectedDates).toBeDateArray(results);
    });
    it('should schedule events that fall partially within date range while applying business holiday', () => {
        const rule = RRule.fromString(`FREQ=YEARLY;BYMONTH=11,12,1,2,3,4;BYMONTHDAY=1`);
        rule.options.dtstart = new Date('2017-04-03T05:00:00Z');
        const startDate = new Date('2017-04-01T05:00:00Z');
        const endDate = new Date('2017-12-31T05:00:00Z');
        const expectedDates = [new Date('2017-11-01T05:00:00Z'), new Date('2017-12-01T05:00:00Z')];
        const results = scheduler.getNextDates(rule, startDate, endDate);
        expect(expectedDates.length).toEqual(results.length);
        expect(expectedDates).toBeDateArray(results);
    });
    it('should schedule only requested amount of events', () => {
        const rule = RRule.fromString(`FREQ=MONTHLY;COUNT=4;BYMONTHDAY=11`);
        rule.options.dtstart = new Date('2017-05-01T03:00:00Z');
        const startDate = new Date('2017-03-31T05:00:00Z');
        const endDate = new Date('2017-12-31T05:00:00Z');
        const results = scheduler.getNextDates(rule, startDate, endDate);
        expect(4).toEqual(results.length);
    });
});
//# sourceMappingURL=schedulerSpec.js.map