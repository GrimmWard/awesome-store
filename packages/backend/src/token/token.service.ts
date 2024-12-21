import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	public async generateTokens(userId: string, email: string) {
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
}
