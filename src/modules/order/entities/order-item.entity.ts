import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @OneToOne(() => Product, (product) => product.orderItem)
  @JoinColumn()
  product: Product;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  price_at_buy: number;
}
