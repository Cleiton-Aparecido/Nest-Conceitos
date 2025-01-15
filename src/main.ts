import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

async function bootstrap() {
  console.log({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  console.log(process.env.JWT_SECRET);
  console.log(process.env.DB_HOST);
  const app = await NestFactory.create(AppModule);
  // return;

  // app.enableCors({
  //   methods: ["GET"],
  //   origin: ["HCODE.COM.BR"],
  // });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
