import { Controller, HttpCode, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('authentication')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Response() response) {
    response.setHeader('Set-Cookie', null)
    return response.sendStatus(HttpStatus.OK);
  }
}