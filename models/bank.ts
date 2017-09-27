import { EventType } from './event';
import { RecurringEvent } from './recurringEvent';
import { compareDates } from '../utils/dateComparator';
import { ILedger } from './ledger';
import { IAccount, Account } from './account';
export class Bank {
  accounts: Account[]
  recurringEvents: RecurringEvent[]

  constructor(accounts: IAccount[],
    recurringEvents: {name: string; type: string, source: string,
      recurrence: string; startDate: Date, amount: number, target: string,
      category: string}[]) {
    this.accounts = accounts.map(a => new Account(a))
    this.recurringEvents = recurringEvents.map(d => new RecurringEvent(
      d.name, d.amount, d.type as any, d.category, d.recurrence, d.startDate,
      d.source, d.target
    ))
  }

  getAccount(name: string): Account {
    let found = this.accounts.find(a => a.name.toLowerCase()
      === name.toLowerCase())
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

    this.runSimulation(firstDay, lastDay)
  }

  runNextMonth() {
    var date = new Date()
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var firstDay = new Date(y, m, 1)
    var lastDay = new Date(y, m + 1, 0)

    this.runSimulation(firstDay, lastDay)
  }

  private runSimulation(firstDay: Date, lastDay: Date) {
    const ledger =
      this.recurringEvents
        .map(re => re.toLedgerArray(firstDay, lastDay))
        .reduce((a, b) => a.concat(b))

    let startDate = new Date(firstDay)

    for(let currentDay = startDate; currentDay <= lastDay;
        startDate.setDate(startDate.getDate() + 1)) {
      this.runDay(ledger, currentDay)
    }
  }

  private runDay(ledger: ILedger[], currentDay: Date) {
    let entries = ledger.filter(e => compareDates(e.date, currentDay))

    entries.forEach(e => {
      if(e.sourceAccount) {
        let sourceAccount = this.getAccount(e.sourceAccount)

        switch(e.type) {
          case EventType.Income:
            sourceAccount.add(e.amount, e.date, e.type, e.name, e.category)
            break
          case EventType.Expenditure:
            sourceAccount.deduct(e.amount, e.date, e.type, e.name, e.category)
            break
          case EventType.Transfer:
            if(e.targetAccount) {
              let targetAccount = this.getAccount(e.targetAccount)
              sourceAccount.deduct(e.amount, e.date, e.type, e.name, e.category)
              targetAccount.add(e.amount, e.date, e.type, e.name, e.category)
            }
        }
      }
    })
  }
}