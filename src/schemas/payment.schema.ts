import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import IPayment from 'src/interfaces/payment.interface';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ collection: 'germoda-payments' })
export class Payment implements IPayment {
  @Prop({ require: true })
  studentId: string;

  @Prop({ require: true })
  amount: number;

  @Prop({ require: true })
  balance: number;

  @Prop({ type: Date })
  paymentDateTime: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

export const PaymentMongooseModule = MongooseModule.forFeature([
  { schema: PaymentSchema, name: Payment.name },
]);
