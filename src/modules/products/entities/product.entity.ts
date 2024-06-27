import { CartItem } from 'src/modules/cart/entities/cart-Item.entiy';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  categoryId: number;
}
