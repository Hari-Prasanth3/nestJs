import { IsEmail,  IsString } from "class-validator";

export class Createuser{
    @IsString()
    
    name: string;
    @IsEmail()
   email: string;

   @IsString()
   password: string;

}