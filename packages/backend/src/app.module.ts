import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@/prisma/prisma.module';
// import { AuthModule } from './auth/auth.module';
// import { EmailModule } from './email/email.module';

@Module({
	// imports: [PrismaModule, AuthModule, EmailModule],
	imports: [PrismaModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
