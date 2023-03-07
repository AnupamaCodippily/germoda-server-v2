import { CacheModule, Module } from '@nestjs/common';
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
import { CourseModule } from './modules/course/course.module';
import { MessagesModule } from './modules/messages/messages.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CacheModule.register(),
    AdminModule,
    StudentModule,
    InquiryModule,
    OnlineClassModule,
    AuthModule,
    PaymentModule,
    CourseModule,
    MessagesModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {}
