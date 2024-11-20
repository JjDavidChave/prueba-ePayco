import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/database/entities/transaction';
import { paginate } from 'src/lib/paginate/paginate.service';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }
  async list(paginateDto: PaginateDto) {
    return await paginate<Transaction>(this, paginateDto);
  }
}
