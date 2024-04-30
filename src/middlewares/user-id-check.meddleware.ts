import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";

export class UserIdCheckMeddleWare implements NestMiddleware{
    use(req: Request,res: Response, next: NextFunction){

        
        console.log("antes middle")

       if( isNaN( Number(req.params.id)) || Number(req.params.id) <= 0 ) {
            throw new BadRequestException(`Id inválida!`);
       }

       console.log("depois middle")
       next()

    }
}