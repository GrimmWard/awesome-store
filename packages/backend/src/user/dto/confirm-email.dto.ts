import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	verificationCode: string;
}
