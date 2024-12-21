import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(user: CreateUserDto): Promise<User> {
		const { password, ...rest } = user;
		const hashedPassword = await bcrypt.hash(password, 10);

		return this.prisma.user.create({
			data: {
				...rest,
				password: hashedPassword,
			},
		});
	}

	async updateUser(
		userToUpdate: User,
		data: Record<string, string | boolean | null>,
	) {
		return this.prisma.user.update({
			where: { email: userToUpdate.email },
			data,
		});
	}

	async getUserByEmail(email: string) {
		return this.prisma.user.findFirst({ where: { email } });
	}
}
