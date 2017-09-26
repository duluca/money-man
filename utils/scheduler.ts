import * as RRule from 'rrule-alt'
var biz = require('@date/business')({
  // use USA bank holidays
  holidays: require('@date/holidays-us').bank()
})

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