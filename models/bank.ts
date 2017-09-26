import { Payment } from './payment';
import { Income } from './income';
import { IAccount, Account } from './account';
export class Bank {
  accounts: Account[]
  income: Income[]
  payments: Payment[]

  constructor(accounts: IAccount[],
    income: {name: string; recurrence: string; amount: number; target: string}[],
    payments: {name: string; type: string, source: string, recurrence: string; startDate: Date, amount: number}[]) {
    this.accounts = accounts.map(a => new Account(a))
    this.income = income.map(d => new Income(d.name, d.recurrence, d.amount, d.target))
    this.payments = payments.map(d => new Payment(d.name, d.type, d.source, d.recurrence, d.startDate, d.amount))
  }

  getAccount(name: string): Account {
    let found = this.accounts.find(a => a.name.toLowerCase() === name.toLowerCase())
    if(!found) {
      throw `Account ${name} not found!`
    }
    return found
  }

  printBalances() {
    this.accounts.forEach(a =>
      console.log(`Name: ${a.name} - Balance: ${a.prettyBalance}`
    ))
  }

  printAccounts() {
    this.accounts.forEach(a => a.printLedger())
  }

  runThisMonth() {
    var date = new Date()
    var y = date.getFullYear()
    var m = date.getMonth()
    var firstDay = new Date(y, m, date.getDate())
    var lastDay = new Date(y, m + 2, 0)

    this.runMonth(firstDay, lastDay)
  }

  runNextMonth() {
    var date = new Date()
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var firstDay = new Date(y, m, 1)
    var lastDay = new Date(y, m + 1, 0)

    this.runMonth(firstDay, lastDay)
  }

  runMonth(firstDay: Date, lastDay: Date) {
    let ledger: { date: Date, name: string, amount: number, account: string }[] = []

    this.income.forEach(i => {
      i.getNextDates(firstDay, lastDay).forEach(iDate => {
        ledger.push({date: iDate, name: i.name, amount: i.amount, account: i.target})
      })
    })

    this.payments.forEach(i => {
      i.getNextDates(firstDay, lastDay).forEach(iDate => {
        ledger.push({date: iDate, name: i.name, amount: -i.amount, account: i.source})
      })
    })

    let startDate = new Date(firstDay)

    for(let i = startDate; i <= lastDay;startDate.setDate(startDate.getDate() + 1)) {
      let entries = ledger.filter(e => e.date.toLocaleDateString() === i.toLocaleDateString())

      entries.forEach(element => {
        let account = this.getAccount(element.account)
        account.modBalance(element.amount, element.date, element.name)
      })
    }
  }
}