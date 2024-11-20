import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['RECHARGE', 'PAYMENT'] })
  type: 'RECHARGE' | 'PAYMENT';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  sessionId?: string;

  @Column({ nullable: true })
  token?: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @ManyToOne(() => Wallet, (wallet) => wallet.transaction)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column('uuid')
  walletId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: Partial<Transaction>) {
    Object.assign(this, data);
  }
}
