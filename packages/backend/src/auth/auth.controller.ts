import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Public} from "@/common/decorators/public.decorator";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
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
	@Public()
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
	@Public()
	@Post('confirm-user')
	async confirmUser(
		@Body()
		body: {
			email: string;
			confirmCode: string;
		},
	) {
		const { email, confirmCode } = body;
		return this.authService.verifyCode(confirmCode, email);
	}

	@Get('users')
	async getAllUsers() {
		return this.authService.getAllUsers();
	}
}
