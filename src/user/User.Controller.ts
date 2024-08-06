import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatepatchUserDTO } from 'src/user/dto/update-patch-user.dto  copy';
import { UpdateUserDTO } from 'src/user/dto/update-put-user.dto ';
import { UserService } from './user.service';
import { logInterceptor } from 'src/interceptors/interceptor';
import { Paramid } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

// @Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(logInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() dados: CreateUserDTO) {
    return this.userService.create(dados);
  }

  @Get()
  async list() {
    console.log('list');
    return this.userService.list();
  }
  @Delete(':id')
  async DeleteParcial(@Param('id', ParseIntPipe) id) {
    console.log('DeleteParcial');
    return this.userService.delete(id);
  }

  @Get(':id')
  async readOne(@Paramid() id: number) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdateUserDTO, @Param('id', ParseIntPipe) id) {
    console.log(data)
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updateParcial(
    @Body() data: UpdatepatchUserDTO,
    @Param('id', ParseIntPipe) id,
  ) {
    return this.userService.updateParcial(id, data);
  }
}
