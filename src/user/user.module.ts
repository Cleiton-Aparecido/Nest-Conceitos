import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./User.Controller";
import { UserService } from "./dto/user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserIdCheckMeddleWare } from "src/middlewares/user-id-check.meddleware";

@Module({
    imports:[PrismaModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService],
})
export class UserModule implements NestModule{
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMeddleWare).forRoutes({
            path:'users/:id',
            method: RequestMethod.ALL
        })
    }
}