import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from "@nestjs/common";
import { UserController } from "./User.Controller";
import { UserService } from "./user.service";
import { UserIdCheckMeddleWare } from "src/middlewares/user-id-check.meddleware";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMeddleWare).forRoutes({
      path: "users/:id",
      method: RequestMethod.ALL,
    });
  }
}
