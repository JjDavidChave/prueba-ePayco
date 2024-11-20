import { DataSource, DataSourceOptions } from 'typeorm';
import * as entities from '../../database/entities-index';
import * as migrations from '../../database/migrations-index';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
// import fs from 'fs';

export const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME || 'proof_epayco',
  port: +process.env.DB_PORT || 5432,
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  synchronize: false,
  logging: ['query', 'error'],
  entities: Object.values(entities),
  migrations: Object.values(migrations),
  // entities: ['dist/database/entities/*.{ts,js}'],
  // migrations: ['dist/database/migrations/*.{ts,js}'],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
  migrationsTableName: 'migrations',
  // migrationsRun: true,
  // ssl: {
  //   ca: fs.readFileSync('./us-east-1-bundle.pem').toString(),
  // },
};

export default new DataSource(config);
