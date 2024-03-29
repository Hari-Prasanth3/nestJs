import { IsEmail,  IsString } from "class-validator";

export class Loginuser{


    @IsEmail()
   email: string;

   @IsString()
   password: string;

}