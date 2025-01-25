import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailService } from '@/email/email.service';
import { generateCode } from '@/utils/utils';
import { TokenService } from '@/token/token.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { ConfirmEmailDto } from '@/user/dto/confirm-email.dto';
import { LoginUserDto } from '@/user/dto/login.dto';
import { LogoutDto } from '@/user/dto/logout.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly emailService: EmailService,
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
	) {}

	async register(user: CreateUserDto) {
		const verificationCode = generateCode();
		const newUser = await this.userService.createUser(user);

		await this.userService.updateUser(newUser, { verificationCode });
		await this.emailService.sendEmail(user.email, verificationCode);
	}

	async login(data: LoginUserDto) {
		const user = await this.userService.getUserByEmail(data.email);

		if (!user) {
			throw new NotFoundException('No such user with email');
		}
		if (!user.isVerified) {
			throw new UnauthorizedException('Your account is not verified yet');
		}

		const isPasswordMatch = await bcrypt.compare(
			data.password,
			user.password,
		);
		if (!isPasswordMatch) {
			throw new UnauthorizedException();
		}

		return await this.tokenService.generateTokens(user.id, user.email);
	}

	async verifyEmailCode(data: ConfirmEmailDto) {
		const user = await this.userService.getUserByEmail(data.email);

		if (user?.verificationCode !== data.verificationCode) {
			throw new UnauthorizedException('Invalid code');
		}
		const dataToUpdate = {
			isVerified: true,
			verificationCode: null,
		};
		await this.userService.updateUser(user, dataToUpdate);
	}

	async logout(data: LogoutDto) {
		const user = await this.userService.getUserById(data.userId);

		if (!user) {
			throw new NotFoundException('No such user in database');
		}
	}
}
