import { IsEmail,  IsString } from "class-validator";

export class Createuser{
    @IsString()
    name: string;
    @IsEmail()
   email: string;

   @IsString()
   password: string;
// readonly name: string;
// readonly email: string;
// readonly age: number;
}