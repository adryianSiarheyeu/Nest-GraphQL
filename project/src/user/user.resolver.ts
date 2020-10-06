import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [CreateUserDto])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => CreateUserDto)
  async findUserById(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Mutation(() => CreateUserDto)
  async createUser(
    @Args('name') name: string,
    @Args('gender') gender: string,
    @Args('age') age: number,
  ) {
    return this.userService.create({ name, gender, age });
  }

  @Mutation(() => CreateUserDto)
  async removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
