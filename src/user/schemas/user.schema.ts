import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User{
    @Prop()
    name: string;

    @Prop({unique: true})
    email: string;

     @Prop()
    password: string;
    
    @Prop({ required: true, default: 'user' }) // Default role is 'user'
    role: string;

}
export const UserSchema = SchemaFactory.createForClass(User)