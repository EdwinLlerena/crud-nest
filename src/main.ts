import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERSERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERSERVER_PORT) || 3000;
  await app.listen(port);
  console.log(`listenin on port ${await app.getUrl()}`);
}
bootstrap();
