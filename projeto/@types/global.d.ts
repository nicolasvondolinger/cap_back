import {User} from '../src/domains/User/types/user.interface';
declare global {
    namespace Express {
        interface Request{
            user: User;
        }
    }
namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string,
        PORT: string,
        APP_URL: string,
        JWT_EXPIRATION: string,
        SECRET_KEY: string,
        NODE_ENV: string,
        EMAIL_USER: string,
        EMAIL_PASSWORD: string,
        AWS_ACCESS_KEY: string,
        AWS_SECRET_KEY: string,
        AWS_BUCKET_NAME: string,
        AWS_BUCKET_REGION: string,

    }
}
}