import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './user.input';
import { CreateUserDto } from './create-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CreateUserDto])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => CreateUserDto)
  async createUser(
    @Args('name') name: string,
    @Args('gender') gender: string,
    @Args('age') age: number,
  ) {
    return this.userService.create({ name, gender, age });
  }
}
