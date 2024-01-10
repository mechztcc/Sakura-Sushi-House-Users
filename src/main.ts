import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use((req, _, next) => {
    console.log(`Got invoked: '${req.headers}'`);
    next();
  });
  await app.listen(3001);
}
bootstrap();
