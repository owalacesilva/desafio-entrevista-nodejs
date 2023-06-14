import { Company } from 'src/company/company.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
  
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  full_name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];
}