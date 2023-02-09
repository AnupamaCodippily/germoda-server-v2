import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './modules/admin/admin.controller';
import { AdminModule } from './modules/admin/admin.module';
import { AdminService } from './modules/admin/admin.service';
import { StudentModule } from './modules/student/student.module';
import { InquiryModule } from './modules/inquiry/inquiry.module';
import { OnlineClassModule } from './modules/online-class/online-class.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AdminModule,
    StudentModule,
    InquiryModule,
    OnlineClassModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {}