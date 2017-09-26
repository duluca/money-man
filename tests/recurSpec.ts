/// <reference path="matchers/dateArray.matcher.d.ts"/>
import { compareDates, getNextDates } from '../models/recur';
import * as RRule from 'rrule-alt';
import { dateArrayMatcher } from "./matchers/dateArray.matcher";

describe('compareDates', function() {
  it('should match when time component is different in the same timezone', () => {
    const a = new Date('2017-08-01T05:00:00Z')
    const b = new Date('2017-08-01T06:00:00Z')

    const isMatch = compareDates(a, b)
    expect(isMatch).toBeTruthy()
  })

  it('should fail when time component is changes actual date in the same timezone ', () => {
    const a = new Date('2017-08-01T00:00:00Z')
    const b = new Date('2017-08-01T06:00:00Z')

    const isMatch = compareDates(a, b)
    expect(isMatch).toBeFalsy()
  })
})

describe('getNextDates', function() {
  beforeEach(() => {
    jasmine.addMatchers(dateArrayMatcher)
  })

  it('should ignore past dates', () => {
    const rule = RRule.fromString(`FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=15`)
    rule.options.dtstart = new Date('2017-08-01T05:00:00Z')

    const startDate = new Date('2017-09-01T05:00:00Z')
    const endDate = new Date('2017-12-31T05:00:00Z')
    const expectedDates = [new Date('2017-11-15T05:00:00Z')]


    const results = getNextDates(rule, startDate, endDate)

    expect(expectedDates.length).toEqual(results.length)
    expect(expectedDates).toBeDateArray(results)
  })

  it('applied date ranges correctly', () => {
    const rule = RRule.fromString(`FREQ=YEARLY;BYMONTH=11,12,1,2,3,4;BYMONTHDAY=1`)
    rule.options.dtstart = new Date('2017-04-03T05:00:00Z')

    const startDate = new Date('2017-04-01T05:00:00Z')
    const endDate = new Date('2017-12-31T05:00:00Z')
    const expectedDates = [ new Date('2017-11-01T05:00:00Z'), new Date('2017-12-01T05:00:00Z')]


    const results = getNextDates(rule, startDate, endDate)

    expect(expectedDates.length).toEqual(results.length)
    expect(expectedDates).toBeDateArray(results)
  })

  it('applied date ranges correctly', () => {
    const rule = RRule.fromString(`FREQ=YEARLY;BYMONTH=11,12,1,2,3,4;BYMONTHDAY=1`)
    rule.options.dtstart = new Date('2017-03-01T03:00:00Z')

    const startDate = new Date('2017-03-31T05:00:00Z')
    const endDate = new Date('2017-12-31T05:00:00Z')
    const expectedDates = [ new Date('2017-03-31T05:00:00Z'), new Date('2017-11-01T05:00:00Z'), new Date('2017-12-01T05:00:00Z')]

    const results = getNextDates(rule, startDate, endDate)

    expect(expectedDates.length).toEqual(results.length)
    expect(expectedDates).toBeDateArray(results)
  })
})