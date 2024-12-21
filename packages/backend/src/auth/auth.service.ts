import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { EmailService } from '@/email/email.service';
import { generateCode } from '@/utils/utils';
import { TokenService } from '@/token/token.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { ConfirmEmailDto } from '@/user/dto/confirm-email.dto';
import { LoginUserDto } from '@/user/dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
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

		const tokens = await this.tokenService.generateTokens(
			user.id,
			user.email,
		);

		const hashedRefreshToken: string = await bcrypt.hash(
			tokens.refreshToken,
			10,
		);

		await this.userService.updateUser(user, {
			refreshToken: hashedRefreshToken,
		});
	}

	async verifyEmailCode(data: ConfirmEmailDto) {
		const user = await this.userService.getUserByEmail(data.email);

		if (user?.verificationCode !== data.verificationCode) {
			throw new UnauthorizedException('Invalid token');
		}
		const dataToUpdate = {
			isVerified: true,
			verificationCode: null,
		};
		await this.userService.updateUser(user, dataToUpdate);
	}

	async getAllUsers() {
		return await this.prisma.user.findMany();
	}

	async logout(email: string) {
		this.prisma.user.update({
			where: { email },
			data: { refreshToken: null },
		});
	}
}
