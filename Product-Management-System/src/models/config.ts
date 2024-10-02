import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

const env: string = process.env.NODE_ENV || 'development' as string;
const username: string = process.env.POSTGRES_USERNAME as string;
const password: string = process.env.POSTGRES_PASSWORD as string;
const database: string = process.env.POSTGRES_DATABASE as string;
const host: string = process.env.POSTGRES_HOST as string;
const port: number = Number(process.env.POSTGRES_PORT) as number;
const dialect: Dialect = 'postgres' as Dialect;

const config = {
    dialect,
    username,
    password,
    database,
    host,
    port,
    logging: false,
    pool: {
        max:50,
        min:0,
        acquire: 1200000,
        idle: 1000000,
    },
};

const dbConfigs = {
    [env]: config,
};

export = dbConfigs


