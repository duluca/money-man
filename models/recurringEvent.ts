import { ILedger } from './ledger';
import { Event, EventType, IEvent } from './event';
import * as RRule from 'rrule-alt';
import * as scheduler from '../utils/scheduler';

export interface IRecurringEvent extends IEvent {
  recurrence: RRule
  startDate?: Date
}

export class RecurringEvent extends Event implements IRecurringEvent {
  recurrence: RRule

  constructor(public name: string, public amount: number,
      typeName: keyof typeof EventType, category: string,
      recurrenceString: string, public startDate?: Date,
      public sourceAccount?: string, public targetAccount?: string) {
    super(name, amount, typeName, category, sourceAccount, targetAccount)
    this.recurrence = RRule.fromString(recurrenceString)
    if(this.startDate) {
      this.recurrence.options.dtstart = this.startDate
    }
  }

  getNextDates(startDate: Date, endDate: Date): Date[] {
    return scheduler.getNextDates(this.recurrence, startDate, endDate)
  }

  toLedgerArray(startDate: Date, endDate: Date): ILedger[] {
    return this.getNextDates(startDate, endDate).map(d => this.toLedger(d))
  }
}
