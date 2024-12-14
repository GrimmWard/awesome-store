import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import { EmailService } from '@/email/email.service';
import { generateCode } from '@/utils/utils';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly emailService: EmailService,
	) {}

	private async generateTokens(userId: string, email: string) {
		const payload = { id: userId, email };

		const accessToken: string = this.jwtService.sign(payload, {
			secret: process.env.ACCESS_SECRET,
			expiresIn: '15m',
		});

		const refreshToken: string = this.jwtService.sign(payload, {
			secret: process.env.REFRESH_SECRET,
			expiresIn: '7d',
		});

		return { accessToken, refreshToken };
	}

	private async recordRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10);
		await this.prisma.user.update({
			where: { id: userId },
			data: { refreshToken: hashedRefreshToken },
		});
	}

	async register(
		email: string,
		password: string,
		fullName: string,
		address: string,
	) {
		const verificationCode = generateCode();

		const existingUser = await this.prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			throw new NotFoundException(
				`User already exists with email ${email}`,
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				fullName,
				address,
			},
		});
		await this.prisma.user.update({
			where: { email },
			data: { verificationCode: verificationCode },
		});
		await this.emailService.sendEmail(email, verificationCode);
	}

	async verifyCode(verificationCode: string, email: string) {
		const user = this.prisma.user.findFirst({
			where: { verificationCode },
		});
		if (!user)
			throw new NotFoundException('Could not find verification code');

		await this.prisma.user.update({
			where: { email },
			data: {
				verificationCode: null,
				isVerified: true,
			},
		});
	}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});
		if (!user) {
			throw new NotFoundException(`No such user with email ${email}`);
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw new UnauthorizedException();
		}

		const tokens = await this.generateTokens(user.id, user.email);

		await this.recordRefreshToken(user.id, tokens.refreshToken);

		return tokens;
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
