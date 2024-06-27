import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Cart } from 'src/modules/cart/entities/cart.entity';
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

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

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
