import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users';
import { Transaction } from './transaction';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => Users, (user) => user.wallet)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column('uuid')
  userId: string;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transaction: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: Partial<Wallet>) {
    Object.assign(this, data);
  }
}
