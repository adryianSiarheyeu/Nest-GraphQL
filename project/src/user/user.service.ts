import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { UserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: UserInput): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return await createdUser.save();
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findOneAndRemove({ _id: id });
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
}
