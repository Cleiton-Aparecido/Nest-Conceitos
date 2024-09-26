import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserController } from './User.Controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserIdCheckMeddleWare } from 'src/middlewares/user-id-check.meddleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMeddleWare).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
