import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.cartItem)
  product: Product;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column()
  cartId: number;

  @CreateDateColumn()
  createdAt: Date;
}
