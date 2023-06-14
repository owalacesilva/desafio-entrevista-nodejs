import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'mysqldb',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'parking',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        logging: 'all',
        logger: 'advanced-console',
      });

      return dataSource.initialize();
    },
  },
];