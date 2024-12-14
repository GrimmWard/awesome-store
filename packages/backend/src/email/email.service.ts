import { Injectable } from '@nestjs/common';
import * as postmark from 'postmark';

@Injectable()
export class EmailService {
	private client: postmark.ServerClient;

	constructor() {
		this.client = new postmark.ServerClient(
			process.env.POSTMARK_API_KEY || '',
		);
	}

	public async sendEmail(
		email: string,
		verificationCode: string,
	): Promise<void> {
		await this.client.sendEmail({
			From: 'ivankramar.w@meta.ua',
			To: email,
			Subject: 'Email Verification',
			TextBody: `Hi. Your verification code is ${verificationCode}`,
		});
	}
}
