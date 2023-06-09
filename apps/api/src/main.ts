import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const configService = app.get(ConfigService)
  const PORT = configService.get("port");
  await app.listen(PORT || 8000);
}
bootstrap();