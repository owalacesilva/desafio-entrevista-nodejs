import { Park } from 'src/park/park.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
  
@Entity()
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

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
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

  @OneToMany(() => Park, (park) => park.company)
  parks: Park[];
}