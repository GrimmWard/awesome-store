import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/common/decorators/public.decorator';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { ConfirmEmailDto } from '@/user/dto/confirm-email.dto';
import { LoginUserDto } from '@/user/dto/login.dto';
import { LogoutDto } from '@/user/dto/logout.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	async register(
		@Body()
		user: CreateUserDto,
	) {
		return this.authService.register(user);
	}

	@Public()
	@Post('login')
	async login(
		@Body()
		data: LoginUserDto,
	) {
		return this.authService.login(data);
	}

	@Public()
	@Post('confirm-user')
	async confirmUser(
		@Body()
		data: ConfirmEmailDto,
	) {
		return this.authService.verifyEmailCode(data);
	}

	@Post('logout')
	async logout(
		@Body()
		data: LogoutDto,
	) {
		return this.authService.logout(data);
	}
}
