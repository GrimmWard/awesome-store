import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@/common/types/jwt.types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'access') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.ACCESS_SECRET,
		});
	}

	validate(payload: JwtPayload) {
		return { userId: payload.sub, email: payload.email };
	}
}
