import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { PaymentType } from '../enums/payment-type.enum';
import { OrderItem } from './order-item.entity';
import { PaymentStatus } from '../enums/payment-status.enum';
import { OrderStatus } from '../enums/order-status.enum';

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
  coupon: string;

  @Column({ nullable: true })
  paymentStatus: PaymentStatus;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

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
