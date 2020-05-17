import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsBalance {
  transactions: Transaction[];
  balance: Balance;
}

interface TransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsBalance {
    const transactionsBalance = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return transactionsBalance;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc: Balance, cur: Transaction) => {
        if (cur.type === 'income') {
          acc.income += cur.value;
        } else {
          acc.outcome += cur.value;
        }

        acc.total = acc.income - acc.outcome;

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create({ title, value, type }: TransactionsDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  public findTransactionByTitle(title: string) {
    return this.transactions.find(transaction => transaction.title === title);
  }
}

export default TransactionsRepository;
