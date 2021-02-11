import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Types } from 'mongoose';

import { User, UserDocument } from './user.model';
import { UserService } from './user.service';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './user.input';
import { Hobby } from '../hobby/hobby.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.userService.getUserById(_id);
  }

  @Query(() => [User])
  async users(@Args('filter', { nullable: true }) filters?: ListUserInput) {
    return this.userService.getAllUsers(filters);
  }

  @Mutation(() => User)
  async createUser(@Args('payload') payload: CreateUserInput) {
    return this.userService.createUser(payload);
  }

  @Mutation(() => User)
  async updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.userService.updateUser(payload);
  }

  @Mutation(() => User)
  async removeUser(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.userService.deleteUser(_id);
  }

  @ResolveField()
  async hobbies(
    @Parent() user: UserDocument,
    @Args({
      name: 'populate',
      defaultValue: true,
    })
    populate: boolean,
  ) {
    if (populate) {
      await user
        .populate({ path: 'hobbies', model: Hobby.name })
        .execPopulate();
    }

    return user.hobbies;
  }
}
