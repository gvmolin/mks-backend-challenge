import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from 'helmet';
import { DatabaseUtils } from './infrastructure/utils/database/database.utils';

dotenv.config();
async function bootstrap() {

  const dbUtils = new DatabaseUtils();
  await dbUtils.initializeDB();
  

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("MKS CHALLENGE - Backend")
  .setDescription("API do desafio mks")
  .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" })
  .setVersion("v1")
  .setExternalDoc('Arquivo de Configuração', '/api/docs-json')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  const enviroment = process.env.NODE_ENV.toLowerCase();
  const helmetEnabledCondition = enviroment !== "dev";
  console.log(helmetEnabledCondition);

  if (helmetEnabledCondition) app.use(helmet());
  else SwaggerModule.setup("/api/docs", app, document);

  await app.listen(process.env.APP_PORT, () =>
    console.log(`Server started on port: ${process.env.APP_PORT}`)
  );
}
bootstrap();
