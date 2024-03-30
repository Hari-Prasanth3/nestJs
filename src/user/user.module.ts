import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
     controllers: [UserController],
     providers: [UserService],
     // exports:[UserService],
     imports: [ 
          JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '30d' },
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],

})
export class UserModule{}
