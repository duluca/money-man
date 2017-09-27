import { ILedger } from './ledger';
import { Event, EventType, IEvent } from './event';
import * as RRule from 'rrule-alt';
import * as scheduler from '../utils/scheduler';

export interface IRecurringEvent extends IEvent {
  recurrenceString: string
  startDate?: Date
}

export class RecurringEvent extends Event implements IRecurringEvent {
  startDate?: Date

  constructor(public name: string, public amount: number,
      typeName: keyof typeof EventType, category: string,
      public recurrenceString: string, startDate?: Date | string,
      public sourceAccount?: string, public targetAccount?: string) {
    super(name, amount, typeName, category, sourceAccount, targetAccount)
    if(startDate && startDate instanceof String) {
      this.startDate = new Date(startDate)
    }
  }

  getNextDates(startDate: Date, endDate: Date): Date[] {
    const rule = RRule.fromString(this.recurrenceString)
    rule.options.dtstart = this.startDate || startDate
    return scheduler.getNextDates(rule, startDate, endDate)
  }

  toLedgerArray(startDate: Date, endDate: Date): ILedger[] {
    return this.getNextDates(startDate, endDate).map(d => this.toLedger(d))
  }
}
