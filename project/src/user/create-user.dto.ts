import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateUserDto {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

  @Field()
  readonly gender: string;
}
