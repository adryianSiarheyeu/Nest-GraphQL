import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Hobby } from './hobby.model';
import { HobbyService } from './hobby.service';
import {
  CreateHobbyInput,
  ListHobbyInput,
  UpdateHobbyInput,
} from './hobby.input';

@Resolver(() => Hobby)
export class HobbyResolver {
  constructor(private hobbyService: HobbyService) {}

  @Query(() => Hobby)
  async hobby(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.hobbyService.getHobbyById(_id);
  }

  @Query(() => [Hobby])
  async hobbies(@Args('filters', { nullable: true }) filters?: ListHobbyInput) {
    return this.hobbyService.getAllHobbies(filters);
  }

  @Mutation(() => Hobby)
  async createHobby(@Args('payload') payload: CreateHobbyInput) {
    return this.hobbyService.createHobby(payload);
  }

  @Mutation(() => Hobby)
  async updateHobby(@Args('payload') payload: UpdateHobbyInput) {
    return this.hobbyService.updateHobby(payload);
  }

  @Mutation(() => Hobby)
  async removeHobby(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.hobbyService.deleteHobby(_id);
  }
}
