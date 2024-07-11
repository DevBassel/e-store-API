import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Role } from 'src/modules/auth/enums/role.enum';
import { Review } from 'src/modules/review/entities/review.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: Role;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @CreateDateColumn()
  joinAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

export class UserSerializer extends User {
  @Exclude()
  password: string;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
