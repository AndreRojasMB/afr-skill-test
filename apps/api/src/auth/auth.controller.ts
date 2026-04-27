import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { RequestWithUser } from "../common/auth-user";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  profile(@Req() request: RequestWithUser) {
    return this.authService.profile(request.user!.sub);
  }
}
