import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateHobbyInput {
  @Field(() => String)
  description: string;
}

@InputType()
export class ListHobbyInput {
  @Field(() => String)
  _id?: Types.ObjectId;

  @Field(() => String)
  description?: string;
}

@InputType()
export class UpdateHobbyInput {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  description?: string;
}
