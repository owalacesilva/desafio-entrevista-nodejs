import { Park } from 'src/park/park.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export const UNIQUE_VEHICLE_REGISTRY_CONSTRAINT = 'UNIQUE_VEHICLE_REGISTRY_CONSTRAINT';
  
@Entity()
@Unique(UNIQUE_VEHICLE_REGISTRY_CONSTRAINT, ['registry'])
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    length: 45
  })
  brand: string;

  @Column({
    length: 45
  })
  model: string;

  @Column({
    length: 20
  })
  color: string;

  @Column({
    length: 9
  })
  registry: string;

  @Column()
  kind_of: string;

  @OneToMany(() => Park, (park) => park.vehicle)
  parks: Park[];
}