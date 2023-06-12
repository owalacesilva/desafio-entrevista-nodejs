import { DataSource } from 'typeorm';
import { Park } from './park.entity';

export const parkProviders = [
  {
    provide: 'PARK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Park),
    inject: ['DATA_SOURCE'],
  },
];