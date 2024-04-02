import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ){
       super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConstants.secret,
       }) 
      
    }
    async validate(payload){
        const {UserId} = payload;
        const user = await this.userModel.findById(UserId);
        // console.log(user);
        
       if(!user){
        throw new UnauthorizedException('Login first to access this endpoint')
       }
       
        return user
       }
}