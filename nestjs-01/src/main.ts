import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer, ValidationError } from 'class-validator';
import { ResponseHandler } from 'src/utils/response-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          [error.property]: Object.values(error.constraints),
        }));
        return new BadRequestException(
          ResponseHandler.error({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Validation failed',
            errors: formattedErrors,
          }),
        );
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
