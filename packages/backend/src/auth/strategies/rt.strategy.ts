import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

export type JwtPayload = {
	sub: string;
	email: string;
};

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.REFRESH_SECRET,
			passReqToCallback: true,
		});
	}

	validate(
		req: Request,
		payload: JwtPayload,
	): JwtPayload & { refreshToken: string } {
		const refreshToken = req
			?.get('authorization')
			?.replace('Bearer', '')
			?.trim();

		if (!refreshToken)
			throw new UnauthorizedException('Refresh token missing');

		return { ...payload, refreshToken };
	}
}
