import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseService } from './database.service';
import { databaseInfo } from './database-info';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: process.env.NODE_ENV === 'test' ? process.env.TYPEORM_TEST_DATABASE : process.env.TYPEORM_DATABASE,
      ...databaseInfo
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
