import { ILedger } from './ledger';
export enum EventType {
  Income,
  Expenditure,
  Transfer,
  Balance
}

export interface IEvent {
  name: string
  amount: number
  type: EventType
  category?: string
  targetAccount?: string
  sourceAccount?: string
}

export class Event implements IEvent {
  type: EventType

  constructor(public name: string, public amount: number,
      typeName: keyof typeof EventType, public category?: string,
      public sourceAccount?: string, public targetAccount?: string) {
    this.type = EventType[typeName]
  }

  toLedger(occuranceDate: Date): ILedger {
    return {
      date: occuranceDate,
      name: this.name,
      amount: this.amount,
      sourceAccount: this.sourceAccount,
      targetAccount: this.targetAccount,
      category: this.category,
      type: this.type
    }
  }
}