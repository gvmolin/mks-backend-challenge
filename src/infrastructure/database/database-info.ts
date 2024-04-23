import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import * as dotenv from "dotenv";

dotenv.config();
export const databaseInfo = {
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    autoLoadEntities: true,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    namingStrategy: new SnakeNamingStrategy(),
    timezone: process.env.TZ
}