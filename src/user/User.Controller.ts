import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatepatchUserDTO } from 'src/user/dto/update-patch-user.dto  copy';
import { UpdateUserDTO } from 'src/user/dto/update-put-user.dto ';
import { UserService } from './dto/user.service';
import { logInterceptor } from 'src/interceptors/interceptor';
import { Paramid } from 'src/decorators/param-id.decorator';



@UseInterceptors(logInterceptor)
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() dados: CreateUserDTO) {
    return this.userService.create(dados);
  }

  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@Paramid() id: number  ) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() {email,name,password,dataNascimento}: UpdateUserDTO ,@Param('id',ParseIntPipe) id){
            return this.userService.update(id,{email,name,password,dataNascimento})
}

  @Patch(':id')
  async updateParcial(@Body() data: UpdatepatchUserDTO ,@Param('id',ParseIntPipe) id){
    return this.userService.updateParcial(id,data) ;
  }
  
  @Delete(':id')
  async DeleteParcial(@Param('id',ParseIntPipe) id){
    return this.userService.delete(id);
  }

}