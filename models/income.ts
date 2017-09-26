import { IRecurring, Recurring } from './recur';
import { IAccount } from './account';
import * as RRule from 'rrule-alt';

export interface IIncome extends IRecurring {
  name: string
  amount: number
  target: string
}

export class Income extends Recurring implements IIncome {
  constructor(public name: string, recurrenceString: string, public amount: number, public target: string) {
    super(recurrenceString)
  }
}