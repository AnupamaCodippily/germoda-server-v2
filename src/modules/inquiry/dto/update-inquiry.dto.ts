import { PartialType } from '@nestjs/mapped-types';
import IInquiry from 'src/interfaces/inquiry.interface';
import { CreateInquiryDto } from './create-inquiry.dto';

export class UpdateInquiryDto extends PartialType(CreateInquiryDto) {
    inquiry:IInquiry
}
