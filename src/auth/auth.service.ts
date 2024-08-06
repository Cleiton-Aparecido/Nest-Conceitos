import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) { }

  async createToken(user: User) {
    return {
      acessToken: this.jwtService.sign(
        {
          idusers: user.idusers,
          name: user.name,
          email: user.email,
        },
        {
          // expiresIn:"10 second",
          subject: String(user.idusers),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }
  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });


    
    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('senha incorretos.');
    }

    return this.createToken(user);

  }

  async forget(email: string) {
    const user = this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail incorretos.');
    }
    //enviar o e-mail
    return true;
  }
  async reset(password: string, token: string) {
    //validar token

    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        idusers: id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }
  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
  IsValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
