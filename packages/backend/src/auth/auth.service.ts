import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../../Users/Johnny/Downloads/test/src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private jwtService: JwtService,
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
		const existingUser = await this.prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			throw new NotFoundException(
				`User already exists with email ${email}`,
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		return await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				fullName,
				address,
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

	async logout() {}
}
