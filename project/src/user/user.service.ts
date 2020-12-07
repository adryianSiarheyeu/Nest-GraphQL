import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Types, Model } from 'mongoose';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(payload: CreateUserInput) {
    const createdUser = new this.userModel(payload);

    return createdUser.save();
  }

  getUserById(_id: Types.ObjectId) {
    return this.userModel.findById(_id).exec();
  }

  getAllUsers(filters: ListUserInput) {
    return this.userModel.find({ ...filters }).exec();
  }

  updateUser(payload: UpdateUserInput) {
    return this.userModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  deleteUser(_id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(_id).exec();
  }
}
