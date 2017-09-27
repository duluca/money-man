import { EventType } from './event'

export interface ILedger {
  date: Date
  name: string
  amount: number
  sourceAccount?: string
  type: EventType
  targetAccount?: string
  category?: string
  note?: string
}