import * as fs from 'fs'
import { promisify } from 'util'
import { Bank } from "./models/bank";

const readFileAsync = promisify(fs.readFile)

async function run() {
  const dataString = await readFileAsync('./data.json', { encoding: 'utf8' })
  const data = JSON.parse(dataString)

  let bank = new Bank(data.accounts, data.income, data.payments)
  bank.runThisMonth()
  bank.printAccounts()
}

run()