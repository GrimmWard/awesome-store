import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';

@Module({
	imports: [PrismaModule, AuthModule, EmailModule, UserModule, TokenModule],
	controllers: [],
	providers: [UserService],
})
export class AppModule {}
