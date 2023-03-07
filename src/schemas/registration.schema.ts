import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, Date, HydratedDocument } from 'mongoose';

export type RegistrationDocument = HydratedDocument<Registration>;

@Schema({ collection: 'germoda-registration' })
class Registration {
  @Prop({ require: true })
  studentId: string;

  @Prop({ require: true })
  amount: number;

  @Prop({ require: true })
  balance: number;

  @Prop({ require: true })
  paymentDateTime: Date;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);

export const RegistrationMongooseModule = MongooseModule.forFeature([
  { name: Registration.name, schema: RegistrationSchema }
])