import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import transactionRouter from '../routes/transaction.routes';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!title || !value || !type) {
      throw new Error('type, title or value not found');
    }
    if (!(type === 'income' || type === 'outcome')) {
      throw new Error('type not valid');
    }
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (total - value < 0) {
        throw new Error("doesn't have enough balance");
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
