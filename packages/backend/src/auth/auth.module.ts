import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from '@/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@/token/token.service';
import { UserService } from '@/user/user.service';

@Module({
	providers: [
		AuthService,
		EmailService,
		TokenService,
		JwtService,
		UserService,
	],
	controllers: [AuthController],
})
export class AuthModule {}
