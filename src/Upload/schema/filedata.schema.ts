/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import

export type FileDataDocument = FileData &
  Document & {
    _id: string;
  };

@Schema()
export class FileData {
  @Prop({ required: true })
  EEID: string;

  @Prop({ required: false })
  FullName: string;

  @Prop({
    required: false,
    enum: ['Finance', 'IT', 'Human Resources', 'Director', 'Manager'],
    message:
      'JobTitle must be one of the following: Manager, Developer, Designer',
  })
  JobTitle: string;

  @Prop({ required: false })
  Department: string;

  @Prop({ required: false })
  BusinessUnit: string;

  @Prop({ required: false })
  Gender: string;

  @Prop({ required: false })
  Ethnicity: string;

  @Prop({
    required: false,
    type: String,
    validate: {
      validator: function (value: string) {
        const data = parseInt(value);
        return data >= 18;
      },
      message: 'Age must be at least 18',
    },
  })
  Age: string;

  @Prop({ required: false })
  HireDate: string;

  @Prop({ required: false })
  AnnualSalary: string;

  @Prop({ required: false })
  Bonus: string;

  @Prop({ required: false })
  Country: string;

  @Prop({ required: false })
  City: string;

  @Prop({ required: false })
  ExitDate: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address',
    },
  })
  email: string;
}

export const FileDataSchema = SchemaFactory.createForClass(FileData);
