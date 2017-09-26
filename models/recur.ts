import * as RRule from 'rrule-alt'
var biz = require('@date/business')({
  // use USA bank holidays
  holidays: require('@date/holidays-us').bank()
})

// Rules Spec: http://www.ietf.org/rfc/rfc2445.txt Page 43
// Rules Documentation: https://github.com/arolson101/rrule-alt
// Business Days: https://www.npmjs.com/package/@date/business

export interface IRecurring {
  recurrence: RRule
  startDate?: Date
}

export abstract class Recurring implements IRecurring {
  recurrence: RRule

  constructor(recurrenceString: string, public startDate?: Date) {
    this.recurrence = RRule.fromString(recurrenceString)
    if(this.startDate) {
      this.recurrence.options.dtstart = this.startDate
    }
  }

  getNextDates(startDate: Date, endDate: Date): Date[] {
    return getNextDates(this.recurrence, startDate, endDate)
  }
}
export function compareDates(a: Date, b: Date) {
  return a.toLocaleDateString() === b.toLocaleDateString()
}

export function getNextDates(rule: RRule, startDate: Date, endDate: Date, debug = false): Date[] {
  if(debug) {
    console.log(`Start: ${startDate.toLocaleDateString()} - End: ${endDate.toLocaleDateString()}`)
  }
  var result = rule.between(startDate, endDate)
  if(debug) {
    console.log(rule.toText())
    console.log('Found dates:')
    console.log(result)
  }

  result = result.map(d => ensureBusinessDay(d))

  var resultsToReturn: Date[] = []
  result.forEach(r => {
      if(r && r >= startDate) {
          resultsToReturn.push(r)
      }
  })

  if(debug) {
    console.log('Filtered dates:')
    console.log(result)
  }

  return resultsToReturn
}

function ensureBusinessDay(date: Date) {
  if(date && !biz.isBusinessDay(date)) {
    date = biz.previousBusinessDay(date)
  }
  return date
}