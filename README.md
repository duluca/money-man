# money-man
> A CLI personal financing tool for cash flow simulation, forecasting, budgeting and debt payoff planning

<img width="673" alt="screen shot 2017-09-26 at 11 51 01 pm" src="https://user-images.githubusercontent.com/822159/30895486-91a402c8-a318-11e7-937c-bf694387143f.png">

## Install
- `npm install -g money-man` or
- `npx money-man`
- Create your own `data.json` file following the sample below
- Execute with `money-man -i /path-to-your-own/data.json` to run a month long simulation
- Execute with `money-man -i /path-to-your-own/data.json -m 12` to run a year long simulation

## Features
- Complex recurring payment scheduling [following RFC 2445 iCalendar spec](http://www.ietf.org/rfc/rfc2445.txt)
- Factor in US bank holidays when calculating due dates (https://www.npmjs.com/package/@date/business)
- Custom account support with daily minimum desired and negative balance tracking
- Custom date range execution for money flow simulation
- Print accounts

## CLI Options
```bash
  Usage: money-man [options]

  Options:

    -V, --version              output the version number
    -i, --input <path>         Specify relative or absolute input data file path
    -m, --months <noOfMonths>  Specify number of months to simulate
    -h, --help                 output usage information
```

## Sample Input Data

```json
{
  "accounts": [
    {
      "name": "Checking",
      "balance": 555.55,
      "minBalance": 50
    },
    {
      "name": "Savings",
      "balance": 995.95,
      "minBalance": 300
    },
    {
      "name": "PiggyBank",
      "balance": 500.01,
      "minBalance": 0
    },
    {
      "name": "Credit",
      "balance": 0,
      "minBalance": 0
    }
  ],
  "recurringEvents": [
    {
      "name": "Acme Co",
      "recurrence": "FREQ=MONTHLY;BYMONTHDAY=1,15",
      "amount": 2000,
      "target": "Checking",
      "type": "Income"
    },
    {
      "name": "Acme Bank",
      "type": "Expenditure",
      "category": "Mortgage",
      "source": "Savings",
      "recurrence": "FREQ=MONTHLY;COUNT=360;BYMONTHDAY=11",
      "startDate": "2017-01-01T05:00:00Z",
      "amount": 1534.13
    },
    {
      "name": "Acme Bank",
      "type": "Transfer",
      "source": "Checking",
      "target": "Savings",
      "recurrence": "FREQ=MONTHLY;COUNT=360;BYMONTHDAY=11",
      "startDate": "2017-01-01T05:00:00Z",
      "amount": 1534.13
    },
    {
      "name": "Water",
      "type": "Expenditure",
      "category": "Utility",
      "source": "Checking",
      "recurrence": "FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=15",
      "startDate": "2017-08-15T05:00:00Z",
      "amount": 200
    },
    {
      "name": "Gas Nov-Apr",
      "type": "Expenditure",
      "category": "Utility",
      "source": "Checking",
      "recurrence": "FREQ=YEARLY;BYMONTH=11,12,1,2,3,4;BYMONTHDAY=1",
      "startDate": "2017-04-03T05:00:00Z",
      "amount": 100
    },
    {
      "name": "Gas May-Oct",
      "type": "Expenditure",
      "category": "Utility",
      "source": "Checking",
      "recurrence": "FREQ=YEARLY;BYMONTH=5,6,7,8,9,10;BYMONTHDAY=1",
      "startDate": "2017-09-01T05:00:00Z",
      "amount": 50
    },
    {
      "name": "Some subscription",
      "type": "Expenditure",
      "category": "Subscriptions",
      "source": "Credit",
      "recurrence": "FREQ=MONTHLY;BYMONTHDAY=21",
      "startDate": "2017-08-15T05:00:00Z",
      "amount": 9.99
    }
  ]
}
```

## TODO
- Recurring transfers between accounts
- Credit card balance, interest rate and minimum payment tracking
- CSV import/export & Excel templates that graph the exported data
- Persistant database-based operations and snapshot updates based on user input
- A UI(unlikely)
- Live connection to bank account to pull latest balances (very unlikely, unless this becomes a commerical product)