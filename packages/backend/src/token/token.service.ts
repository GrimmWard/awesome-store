import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	public async generateTokens(userId: string, email: string) {
		const payload = { sub: userId, email };

		const accessToken: string = this.jwtService.sign(payload, {
			secret: process.env.ACCESS_SECRET,
			expiresIn: '15m',
		});

		return { accessToken };
	}
}
