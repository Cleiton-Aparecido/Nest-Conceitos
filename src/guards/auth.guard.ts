import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/dto/user.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly authService: AuthService,
                private readonly userService: UserService

    ){}


    canActivate(context: ExecutionContext) {
        {
            const request = context.switchToHttp().getRequest();
            const {authorization} = request.headers

            
            try {
                const data = this.authService.checkToken((authorization ?? ''))
               

                request.tokenPayLoad = data
            
                request.user =  this.userService.show(data.idusers);

                return true;

            } catch (e) {
                return false;
            }

    
        }
    }
}