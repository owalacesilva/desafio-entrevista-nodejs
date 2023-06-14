import { Max, Min } from 'class-validator';
import { Park } from 'src/park/park.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export const UNIQUE_COMPANY_CNPJ_CONSTRAINT = 'UNIQUE_COMPANY_CNPJ_CONSTRAINT';
  
@Entity()
@Unique(UNIQUE_COMPANY_CNPJ_CONSTRAINT, ['company_identity'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date; // created_at

  @Column()
  @UpdateDateColumn()
  updated_at: Date; // updated_at

  @ManyToOne(() => User, (user) => user.companies, {
    nullable: false,
    cascade: ["insert", "update"],
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id'
  })
  user: User;

  @Column({
    length: 255
  })
  name: string;

  @Column({
    length: 30
  })
  company_identity: string;

  @Column({
    length: 255
  })
  address: string;

  @Column({
    length: 11
  })
  phone_number: string;

  @Column({
    default: () => '0'
  })
  @Min(1)
  @Max(10)
  amount_motorcycles: number;

  @Column({
    default: () => '0'
  })
  @Min(1)
  @Max(10)
  amount_cars: number;

  @OneToMany(() => Park, (park) => park.company)
  parks: Park[];
}