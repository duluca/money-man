import * as RRule from 'rrule-alt'
var biz = require('@date/business')({
  // use USA bank holidays
  holidays: require('@date/holidays-us').bank()
})

export function getNextDates(rule: RRule, startDate: Date, endDate: Date, debug = false): Date[] {
  let result: Date[] = []
  try {
    if(debug) {
      console.log(`Start: ${startDate.toLocaleDateString()} - End: ${endDate.toLocaleDateString()}`)
      console.log(`Start: ${startDate.toISOString()} - End: ${endDate.toISOString()}`)
    }

    result = rule.between(startDate, endDate)
    if(debug) {
      console.log(rule.toText())
      console.log('Dates to be scheduled:')
      console.log(result)
    }

    result = result.map(d => ensureBusinessDay(d))

    if(debug) {
      console.log('Bank Holiday adjusted dates:')
      console.log(result)
    }

    result.forEach(r => r.setUTCHours(12, 0, 0, 0))

    result = result.filter(r => r && r >= startDate)

    if(debug) {
      console.log('Dates that are later than start date:')
      console.log(result)
    }

  } catch (ex) {
    console.log(ex)
  }

  return result
}

function ensureBusinessDay(date: Date) {
  if(date && !biz.isBusinessDay(date)) {
    date = biz.previousBusinessDay(date)
  }
  return date
}