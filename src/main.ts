import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //bydefault takes mongodb,define explicity if wan to work with fastify
  //Enable validation on all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      // `exceptionFactory` allows you to customize the error response
      exceptionFactory: (errors) => {
        // Collect all individual error messages from constraints
        const errorMessages = errors
          .flatMap((error) =>
            Object.values(error.constraints || {}).flatMap((message) =>
              message ? [message] : [],
            ),
          )
          .filter((message) => message); // Filter out any undefined or null values

        // Join the array of messages into a single string
        const combinedMessage = errorMessages.join(', ');
        return new BadRequestException({
          message: combinedMessage,
          error: 'Bad Request',
          statusCode: 400,
        });
      },
      stopAtFirstError: true, // Optional: only show the first error found
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
