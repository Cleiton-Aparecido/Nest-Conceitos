import { Injectable, NotFoundException, UseInterceptors } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./create-user.dto";
import { UpdateUserDTO } from "./update-put-user.dto ";
import { UpdatepatchUserDTO } from "./update-patch-user.dto  copy";


@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService) {

    }

    
    async create({email,name,password} : CreateUserDTO){

        return this.prisma.user.create({
            data: {  
                email,
                name,
                password
            },
            
        });
    }

    async list(){
        return this.prisma.user.findMany({
            where: {
                email:'cleiton@gmail.com'
            }
        })
    }
    async show(idusers: number){
        return this.prisma.user.findUnique({
            where: {
                    idusers
            }
        })
    }

    async update(idusers: number, data: UpdateUserDTO){
        console.log(data)
        if(!data.dataNascimento){
            data.dataNascimento = null;
        }
        return this.prisma.user.update({
            data:{
                name:data.name,
                email:data.email,
                password:data.password,
                dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : null
            },
            where: {
                idusers
            }

        });
    }

    async updateParcial(idusers: number, data: UpdatepatchUserDTO){

        if(!data.dataNascimento){
            data.dataNascimento = null;
        }
        return this.prisma.user.update({
            data:{
                name:data.name,
                email:data.email,
                password:data.password,
                dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : null
            },
            where: {
                idusers
            }

        });
    }
    async delete(idusers: number){

        if(!(await this.show(idusers))){
            throw new NotFoundException(`O usuario ${idusers} já não existe`);
        }

        return this.prisma.user.delete({
            where: {
                idusers
            }
        });
    }

}