import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { DomainModule } from 'src/domain/domain.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),

    InfrastructureModule,
    DomainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
