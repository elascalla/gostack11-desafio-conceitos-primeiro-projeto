import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction | null {
    const findTransaction = this.transactionsRepository.findTransactionByTitle(
      title,
    );

    if (!['income', 'outcome'].includes(type)) {
      throw Error("Type is 'income' or 'outcome'");
    }

    if (Math.sign(value) < 0) {
      throw Error('Please enter value positive!');
    }

    if (findTransaction) {
      throw Error('Exists one transaction with the same title');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
