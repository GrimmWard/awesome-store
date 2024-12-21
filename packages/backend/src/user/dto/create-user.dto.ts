import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string;

	@IsString()
	@IsNotEmpty()
	fullName: string;

	@IsString()
	@IsNotEmpty()
	address: string;

	@IsString()
	@IsNotEmpty()
	phoneNumber: string;
}
