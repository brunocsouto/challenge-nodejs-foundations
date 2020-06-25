import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    function sumTransactions(transactions: Transaction[]): number {
      return transactions.reduce((total, { value }) => total + value, 0);
    }

    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const incomeTotal = sumTransactions(incomes);
    const outcomeTotal = sumTransactions(outcomes);
    const total = incomeTotal - outcomeTotal;

    const balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
