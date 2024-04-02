import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type USER = {
  username: string;
  firstName: string;
  lastName: string;
};

export type UserDocument = USER & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true }) // Define a property in document
  username: string;

  @Prop() // Define a property in document
  firstName: string;

  @Prop()
  lastName: string;
}
// With 'SchemaFacroty' we tell to nestjs we create a schema from this class
export const UserSchema = SchemaFactory.createForClass(User);
