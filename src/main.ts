import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      exposedHeaders: ['link'],
    },
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
