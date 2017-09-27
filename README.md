# money-man
> A CLI personal financing tool for cash flow simulation, forecasting, budgeting and debt payoff planning

## Features
- Complex recurring payment scheduling [following RFC 2445 iCalendar spec](http://www.ietf.org/rfc/rfc2445.txt)
- Factor in US bank holidays when calculating due dates (https://www.npmjs.com/package/@date/business)
- Custom account support with daily minimum desired and negative balance tracking
- Custom date range execution for money flow simulation

## TODO
- Recurring transfers between accounts
- Credit card balance, interest rate and minimum payment tracking
- CSV import/export & Excel templates that graph the exported data
- Persistant database-based operations and snapshot updates based on user input
- A UI(unlikely)
- Live connection to bank account to pull latest balances (very unlikely, unless this becomes a commerical product)

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