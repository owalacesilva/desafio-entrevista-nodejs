import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
  
@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date; // created_at

  @Column()
  @UpdateDateColumn()
  updatedAt: Date; // updated_at

  @Column()
  name: string;

  @Column()
  company_identity: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column({
    default: () => '0'
  })
  amount_motorcycles: number;

  @Column({
    default: () => '0'
  })
  amount_cars: number;
}