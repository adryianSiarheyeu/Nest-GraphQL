import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  hobbies: Types.ObjectId[];
}

@InputType()
export class ListUserInput {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  name?: string;

  @Field(() => [String])
  hobbies?: Types.ObjectId[];
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => [String], {
    nullable: true,
  })
  hobbies: Types.ObjectId[];
}
