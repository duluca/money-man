import { EventType } from './event'
import { ILedger } from './ledger'

export interface IAccount {
  name: string
  balance: number
  minBalance: number
}

export class Account implements IAccount {
  name: string
  balance: number
  minBalance: number
  accountLedger: ILedger[]

  constructor(account: IAccount) {
    this.name = account.name
    this.balance = account.balance
    this.minBalance = account.minBalance
    this.accountLedger = [{ name: this.name, amount: this.balance,
      sourceAccount: this.name, type: EventType.Balance, date: new Date()}]
  }

  add(amount: number, date: Date,
    type: EventType, name: string, category?: string) {
    this.balance = this.balance + amount
    this.modHelper(date, type, name, category)
  }

  deduct(amount: number, date: Date,
    type: EventType, name: string, category?: string) {
    this.balance = this.balance - amount
    this.modHelper(date, type, name, category)
  }

  private modHelper(date: Date, type: EventType, name: string,
    category?: string) {
    this.accountLedger.push({
      sourceAccount: this.name,
      date: date, name: name, amount: this.balance, type: type,
      category: category, note: this.checkWarnings()
    })
  }

  private checkWarnings(): string | undefined {
    if (this.balance < 0) {
      return `NEGATIVE BALANCE!`
    } else if(this.balance < this.minBalance) {
      return `BELOW MINIMUM!`
    }

    return undefined
  }

  get prettyBalance(): string {
    return this.getPrettyBalance(this.balance)
  }

  private getPrettyBalance(balance: number): string {
    return balance.toLocaleString('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 2})
  }

  printLedger() {
    console.log(`Name: ${this.name}`)
    console.log(`-------------------------------`)
    this.accountLedger.forEach(e => {
      if(e.note) {
        console.log(e.note)
      }
      console.log(`${e.date.toLocaleDateString()}, ${e.name}, ${e.type},
        ${this.getPrettyBalance(e.amount)}`)
    })
    console.log(`-------------------------------`)
  }

}