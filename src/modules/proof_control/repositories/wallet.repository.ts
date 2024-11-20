import { Injectable } from '@nestjs/common';
import { Wallet } from 'src/database/entities/wallet';
import { paginate } from 'src/lib/paginate/paginate.service';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WalletRepository extends Repository<Wallet> {
  constructor(private dataSource: DataSource) {
    super(Wallet, dataSource.createEntityManager());
  }
  async list(paginateDto: PaginateDto) {
    return await paginate<Wallet>(this, paginateDto);
  }
}
