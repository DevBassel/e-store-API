import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/modules/order/entities/order.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @Column()
  value: string;

  @Column()
  discount: number;

  @Column()
  validate: number;

  @OneToMany(() => Order, (order) => order.coupon, { onDelete: 'SET NULL' })
  orders: Order[];

  @CreateDateColumn()
  createAt: Date;
}
