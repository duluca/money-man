export interface ILedger {
  date: Date
  name: string
  amount: number
  account?: string
  type?: string
  note?: string
}