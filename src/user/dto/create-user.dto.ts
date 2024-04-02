import { IsEmail,  IsOptional,  IsString } from "class-validator";

export class Createuser{
 

    @IsString()
    name: string;

    @IsEmail()
   email: string;

   @IsString()
   password: string;
   
@IsOptional()
    role: string;

}