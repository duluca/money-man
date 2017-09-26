import { compareDates } from '../../utils/dateComparator'

const dateArrayMatcher: jasmine.CustomMatcherFactories =
{
  toBeDateArray: function(): jasmine.CustomMatcher {
    return {
      compare: function(expected: Array<Date>, actual: Array<Date>): jasmine.CustomMatcherResult {
        let messages: string[] = []

        let arraysAreSame = true;
        for(let i = 0; i < actual.length; i++) {
          if(!compareDates(actual[i], expected[i])) {
            messages.push(`Expected: ${expected[i]} doesn't match Actual: ${actual[i]}`)
            arraysAreSame = false
          }
        }
        return {
          pass: arraysAreSame,
          message: messages.join(',')
         }
      }
    }
  }
}

export { dateArrayMatcher }