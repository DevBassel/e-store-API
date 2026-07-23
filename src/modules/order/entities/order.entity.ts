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
import { Coupon } from 'src/modules/coupons/entities/coupon.entity';

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

  @ManyToOne(() => Coupon, (coupon) => coupon.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  coupon: Coupon;

  @Column({ nullable: true })
  couponId: number;

  @Column({ nullable: true })
  paymentStatus: PaymentStatus;

  @Column({ nullable: true })
  paymentIntentId: string;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column()
  paymentMethod: PaymentType;

  @Column()
  shippingAddress: string;

  @Column({ nullable: true })
  shipingDate: Date;

  @Column({ nullable: true })
  totalPayed: number;

  @Column({ nullable: true })
  totalRefunded: number;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
