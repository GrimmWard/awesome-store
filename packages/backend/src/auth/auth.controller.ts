import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(
		@Body()
		body: {
			email: string;
			password: string;
			fullName: string;
			address: string;
		},
	) {
		const { email, password, fullName, address } = body;
		return this.authService.register(email, password, fullName, address);
	}

	@Post('login')
	async login(
		@Body()
		body: {
			email: string;
			password: string;
		},
	) {
		const { email, password } = body;
		return this.authService.login(email, password);
	}

	@Get('users')
	async getAllUsers() {
		return this.authService.getAllUsers();
	}
}
