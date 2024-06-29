import { CartItem } from 'src/modules/cart/entities/cart-Item.entiy';
import { Category } from 'src/modules/categories/entities/category.entity';
import { OrderItem } from 'src/modules/order/entities/order-item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  img: string;

  @Column({ default: 0 })
  rate: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => CartItem, (item) => item.cart)
  cartItem: CartItem;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToOne(() => OrderItem, (item) => item.product)
  orderItem: OrderItem;

  @Column()
  categoryId: number;
}
