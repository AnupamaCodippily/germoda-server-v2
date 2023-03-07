import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from 'src/schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) 
    private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await new this.paymentModel(createPaymentDto).save();
  }

  async findAll() {
    return await this.paymentModel.find();
  }

  async findOne(id: string) {
    return await this.paymentModel.findById(id);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentModel.findByIdAndUpdate(
      id,
      updatePaymentDto.paymentDetails,
    );
  }

  async remove(id: string) {
    return await this.paymentModel.remove(id);
  }
}
