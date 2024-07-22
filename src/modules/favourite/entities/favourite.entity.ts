import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favourites)
  user: User;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.favourites)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
