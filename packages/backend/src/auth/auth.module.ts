import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from '@/email/email.service';

@Module({
	imports: [JwtModule.register({})],
	providers: [AuthService, EmailService],
	controllers: [AuthController],
})
export class AuthModule {}
