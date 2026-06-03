import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JWTManagement {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  jti: string;
}
