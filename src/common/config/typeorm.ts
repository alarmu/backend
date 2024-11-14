import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST || 'localhost'}`,
  port: `${process.env.DATABASE_PORT || 5432}`,
  username: `${process.env.DATABASE_USERNAME || ''}`,
  password: `${process.env.DATABASE_PASSWORD || ''}`,
  database: `${process.env.DATABASE_NAME || 'alarmu'}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
