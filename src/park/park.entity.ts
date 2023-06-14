import { Company } from 'src/company/company.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => Company, (company) => company.parks, {
    nullable: false,
    cascade: ["insert", "update"],
  })
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id'
  })  
  public company: Company;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.parks, {
    nullable: false,
    cascade: ["insert", "update"],
  })
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id'
  })
  public vehicle: Vehicle;
}