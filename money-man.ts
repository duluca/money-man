import * as fs from 'fs'
import { promisify } from 'util'
import { Bank } from "./models/bank"

var program = require('commander');

program
 .version(process.env.npm_package_version)
 .option('-i, --input <path>', 'Specify relative or absolute input data file path')
 .option('-m, --months <noOfMonths>', 'Specify number of months to simulate', parseInt)
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