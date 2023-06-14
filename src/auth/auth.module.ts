import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth.constants';
import { LocalStrategyProvider } from './strategies/local-strategy.provider';
import { JwtStrategyProvider } from './strategies/jwt-strategy.provider';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '21600s',
      },
    }),
  ],
  providers: [AuthService, LocalStrategyProvider, JwtStrategyProvider],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
