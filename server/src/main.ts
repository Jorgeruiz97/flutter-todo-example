import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // base prefix with API... to be clear
  app.setGlobalPrefix('api');

  // setup swagger documentation
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Todos')
    .setDescription('The TODOs API docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

try {
  bootstrap();
} catch (error) {
  console.error(error);
}
