import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItem } from './cart-Item.entiy';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (item) => item.cart)
  items: CartItem[];

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;
}
