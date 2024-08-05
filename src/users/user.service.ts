import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const token = this.generateEmailToken();
    const createdUser = new this.userModel({ ...createUserDto, token: token });
    console.log(createdUser);
    return createdUser.save();
  }

  generateEmailToken() {
    const randomString = uuidv4();
    return randomString;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByToken(Token: string): Promise<UserDocument> {
    return this.userModel.findOne({ Token }).exec();
  }

  async findByUsername(userName: string): Promise<UserDocument> {
    return this.userModel.findOne({ userName }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
