import { Module, forwardRef } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user/entity/user.entity";

console.log("modulo" + process.env.JWT_SECRETs);
@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: Number("3306"),
      username: "root",
      password: "1234",
      database: "api",
      entities: [UserEntity],
      // synchronize: true, // Verifica se o valor é "true"
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
