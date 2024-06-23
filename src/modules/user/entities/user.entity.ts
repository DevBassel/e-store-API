import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
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
