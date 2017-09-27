import { EventType } from './event'
import { ILedger } from './ledger'

const chalk = require('chalk')
const log = console.log

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
    this.accountLedger = [{ name: this.name, amount: undefined, runningBalance: this.balance,
      sourceAccount: this.name, type: EventType.Balance, date: new Date()}]
  }

  add(amount: number, date: Date,
    type: EventType, name: string, category?: string) {
    this.balance = this.balance + amount
    this.modHelper(date, type, name, amount, this.balance, category)
  }

  deduct(amount: number, date: Date,
    type: EventType, name: string, category?: string) {
    this.balance = this.balance - amount
    this.modHelper(date, type, name, -amount, this.balance, category)
  }

  private modHelper(date: Date, type: EventType, name: string, amount: number,
    balance: number, category?: string) {
    this.accountLedger.push({
      sourceAccount: this.name,
      date: date, name: name, amount: amount, runningBalance: balance, type: type,
      category: category, note: this.checkWarnings()
    })
  }

  private checkWarnings(): string | undefined {
    if (this.balance < 0) {
      return chalk`{red NEGATIVE BALANCE!}`
    } else if(this.balance < this.minBalance) {
      return chalk`{yellow BELOW MINIMUM!}`
    }

    return undefined
  }

  get prettyBalance(): string {
    return this.getPrettyBalance(this.balance)
  }

  private getPrettyBalance(balance: number | undefined, isBalance = false): string {
    if(!balance) {
      return ''.padStart(10).slice(0, 10)
    }
    let output = balance.toLocaleString('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 2}).padStart(10).slice(0, 10)

    if(isBalance && balance < 0) {
      output = chalk.red(output)
    } else if (isBalance && balance < this.minBalance) {
      output = chalk.yellow(output)
    }

    return output
  }

  // private getAccountForPrint(e: ILedger) {
  //   if(e.targetAccount && e.sourceAccount) {
  //     return `${e.targetAccount} -> ${e.sourceAccount}`
  //   }

  //   return e.targetAccount || e.sourceAccount || '--'
  // }


  printLedger() {
    log(``)
    log(chalk`{bold ${this.name}}`)
    log(chalk.gray('-------------------------------------------------------------------------------------------'))
    this.accountLedger.forEach(e => {
      // if(e.note) {
      //   log(e.note)
      // }

      let category = e.category || ''
      log(chalk`${e.date.toISOString().slice(0,10)}, {magenta ${EventType[e.type].padEnd(11).slice(0, 11)}}, {greenBright ${e.name.padEnd(20).slice(0, 20)}}, {green ${category.padEnd(20).slice(0, 20)}}, ${this.getPrettyBalance(e.amount)}, {bold ${this.getPrettyBalance(e.runningBalance, true)}}`)
    })
    log(chalk.gray('-------------------------------------------------------------------------------------------'))
  }

}