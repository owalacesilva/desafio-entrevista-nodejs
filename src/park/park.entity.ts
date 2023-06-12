import { Company } from 'src/company/company.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
  
@Entity()
export class Park extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company)
  public company: Company;

  @ManyToOne(() => Vehicle)
  public vehicle: Vehicle;
}