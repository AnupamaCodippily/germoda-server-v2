import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ collection: 'germoda-students' })
export class Student {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  studentName: string;

  @Prop()
  email: string;

  @Prop()
  course: string;

  @Prop({ type: Date })
  birthDate: mongoose.Date;

  @Prop()
  gender: string;

  @Prop()
  NIC: string;

  @Prop()
  address: string;

  @Prop()
  password: string;

  @Prop()
  country: string;

  @Prop()
  state: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export const StudentMongooseModule = MongooseModule.forFeature([
  { name: Student.name, schema: StudentSchema },
]);
