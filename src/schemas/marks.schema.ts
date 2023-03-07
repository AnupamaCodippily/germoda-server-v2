import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';
import IMarks from 'src/interfaces/marks.interface';

export type MarksDocument = HydratedDocument<Marks>

@Schema ({ collection : 'germoda-marks' })
export class Marks implements IMarks {
  @Prop({ required: true })
  inquiryId: string;

  @Prop({ required: true })
  marks: number;

  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  grade: string;

  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  status: string;
}

export const MarksSchema = SchemaFactory.createForClass(Marks);

export const MarksMongooseModule = MongooseModule.forFeature([
  { name: Marks.name, schema: MarksSchema }
])
