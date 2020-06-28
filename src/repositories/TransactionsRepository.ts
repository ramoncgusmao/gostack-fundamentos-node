import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface Request {
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
    const reduce = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce(reduce, 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce(reduce, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
