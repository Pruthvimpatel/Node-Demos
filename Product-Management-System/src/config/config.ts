import * as dotenv from 'dotenv';
dotenv.config();

export default {
    JWT: {
        SECRET: process.env.JWT_SECRET as string
    },
    ENCRYPTION: {
        IV: process.env.ENCRYPTION_IV as string,
        SECRET: process.env.ENCRYPTION_SECRET as string,
        PASSWORD_SALT: process.env.ENCRYPTION_PASSWORD_SALT as string,
        PASSWORD_ITERATIONS: Number(process.env.ENCRYPTION_PASSWORD_ITERATIONS) || 1000,
    }

}