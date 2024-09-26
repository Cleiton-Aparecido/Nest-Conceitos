import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator ";
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join } from "path";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly AuthService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.AuthService.login(email, password);
  }
  @Post("register")
  async register(@Body() body: AuthRegisterDTO) {
    return this.AuthService.register(body);
  }
  @Post("forget")
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.AuthService.forget(email);
  }
  @Post("reset")
  async Reset(@Body() { password, token }: AuthResetDTO) {
    return this.AuthService.reset(password, token);
  }
  @UseGuards(AuthGuard)
  @Post("me")
  async me(@User() user) {
    return { user };
  }
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Post("photo")
  async uploadPhoto(@User() user, @UploadedFile() photo: Express.Multer.File) {
    const result = await writeFile(
      join(__dirname, "../", "..", "storage", "photos", `photo-${user.id}.png`),
      photo.buffer,
    );
    return { result };
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: "photo",
        maxCount: 1,
      },
      {
        name: "documents",
        maxCount: 10,
      },
    ]),
  )
  @Post("files-fields")
  async uploadFiles(
    @User() user,
    @UploadedFiles()
    files: { photo: Express.Multer.File; documents: Express.Multer.File },
  ) {
    return { files };
  }
}
