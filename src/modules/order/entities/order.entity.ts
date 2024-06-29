import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { PaymentType } from '../enums/payment-type.enum';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column()
  total: number;

  @Column({ nullable: true })
  paymentStatus: OrderStatus;

  @Column()
  paymentMethod: PaymentType;

  @Column()
  shippingAddress: string;

  @Column({ nullable: true })
  shipingDate: Date;

  @Column()
  trackingNumber: string;

  @Column()
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
