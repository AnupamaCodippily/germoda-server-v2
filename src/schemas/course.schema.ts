import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { HydratedDocument } from "mongoose";
import Icourse from "src/interfaces/course.intface";

export type CourseDocument =HydratedDocument<Course>;

@Schema({ collection: 'germoda-course' })
export class Course implements Icourse{
    @Prop({required : true})
    courseId: string;

    @Prop ({required : true})
    courseName: string;

    @Prop ({required : true})
    courseCategory: string;

    @Prop ({required : true})
    courseContanet: string;
    
    @Prop ({required : true})
    courseDuration: string;

    @Prop ({required : true})
    corseFee: number;

    @Prop ({required : true})
    courseDiscount: number;
}

export const CourseSchema =SchemaFactory.createForClass(Course);

export const CourseMongooseModule = MongooseModule.forFeature([
   { name:Course.name,schema:CourseSchema}
]);