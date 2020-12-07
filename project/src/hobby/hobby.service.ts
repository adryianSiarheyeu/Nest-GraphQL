import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hobby, HobbyDocument } from './hobby.model';
import { Types, Model } from 'mongoose';
import {
  CreateHobbyInput,
  ListHobbyInput,
  UpdateHobbyInput,
} from './hobby.input';

@Injectable()
export class HobbyService {
  constructor(
    @InjectModel(Hobby.name) private hobbyModel: Model<HobbyDocument>,
  ) {}

  createHobby(payload: CreateHobbyInput) {
    const createdHobby = new this.hobbyModel(payload);

    return createdHobby.save();
  }

  getHobbyById(_id: Types.ObjectId) {
    return this.hobbyModel.findById(_id).exec();
  }

  getAllHobbies(filters: ListHobbyInput) {
    return this.hobbyModel.find({ ...filters }).exec();
  }

  updateHobby(payload: UpdateHobbyInput) {
    return this.hobbyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  deleteHobby(_id: Types.ObjectId) {
    return this.hobbyModel.findByIdAndDelete(_id).exec();
  }
}
