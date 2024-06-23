import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-put-user.dto ';
import { UpdatepatchUserDTO } from './dto/update-patch-user.dto  copy';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService
  ) { }

  async create(data: CreateUserDTO) {

    const salt = await bcrypt.genSalt()

    data.password = await bcrypt.hash(data.password, salt)

    return this.prisma.user.create({
      data
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }
  async show(idusers: number) {
    return this.prisma.user.findUnique({
      where: {
        idusers: idusers,
      },
    });
  }

  async update(idusers: number, data: UpdateUserDTO) {
    if (!data.dataNascimento) {
      data.dataNascimento = null;
    }
    
    const salt = await bcrypt.genSalt()

    data.password = await bcrypt.hash(data.password, salt)

    return this.prisma.user.update({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        dataNascimento: data.dataNascimento
          ? new Date(data.dataNascimento)
          : null,
      },
      where: {
        idusers,
      },
    });
  }

  async updateParcial(idusers: number, data: UpdatepatchUserDTO) {
    if (!data.dataNascimento) {
      data.dataNascimento = null;
    }
    return this.prisma.user.update({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        dataNascimento: data.dataNascimento
          ? new Date(data.dataNascimento)
          : null,
        role: data.role,
      },
      where: {
        idusers,
      },
    });
  }
  async delete(idusers: number) {
    if (!(await this.show(idusers))) {
      throw new NotFoundException(`O usuario ${idusers} já não existe`);
    }

    return this.prisma.user.delete({
      where: {
        idusers,
      },
    });
  }
  async exits(idusers: number) {
    const cont = await this.prisma.user.count({
      where: {
        idusers,
      },
    });
    try {
      if (!cont) {
        throw new NotFoundException(`O Usuário ${idusers} não existe.`);
      }
    } catch (e) {
      return 'erro' + e.message;
    }
  }
}
