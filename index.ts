import * as fs from 'fs'
import { promisify } from 'util'
import { Bank } from "./models/bank"

var program = require('commander');

program
 .version('1.0.0')
 .option('-I, --input <path>', 'Specify relative or absolute input data file path')
 .option('-M, --months <noOfMonths>', 'Specify number of months to simulate', parseInt)
 .parse(process.argv);

const readFileAsync = promisify(fs.readFile)

async function run() {
  let path = program.input || './data.json'
  const dataString = await readFileAsync(path, { encoding: 'utf8' })
  const data = JSON.parse(dataString)

  let bank = new Bank(data.accounts, data.recurringEvents)

  if(program.months) {
    bank.runNextMonths(program.months)
  } else {
    bank.runThisMonth()
  }
  bank.printAccounts()
}

run()