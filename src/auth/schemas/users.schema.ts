import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true,
})
export class Users {
    @Prop()
    name: string;

    @Prop({unique: [true, 'email is already there']})
    email: string;

    @Prop()
    password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users)