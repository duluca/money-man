export interface IAccount {
  name: string
  balance: number
  minBalance: number
}

export class Account implements IAccount {
  name: string
  balance: number
  minBalance: number
  ledger: { date: Date; name: string; amount: number, note?: string }[]

  constructor(account: IAccount) {
    this.name = account.name
    this.balance = account.balance
    this.minBalance = account.minBalance
    this.ledger = [{ name: this.name, amount: this.balance, date: new Date()}]
  }

  modBalance(amount: number, date: Date, name: string) {
    this.balance = this.balance + amount

    this.ledger.push({
      date: date, name: name, amount: this.balance, note: this.checkWarnings()
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
    return balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2})
  }

  printLedger() {
    console.log(`Name: ${this.name}`)
    console.log(`-------------------------------`)
    this.ledger.forEach(e => {
      if(e.note) {
        console.log(e.note)
      }
      console.log(`${e.date.toLocaleDateString()}, ${e.name}, ${this.getPrettyBalance(e.amount)}`)
    })
    console.log(`-------------------------------`)
  }

}