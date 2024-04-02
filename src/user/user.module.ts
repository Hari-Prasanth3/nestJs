import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";

@Module({
     controllers: [UserController],
     providers: [UserService, JwtStrategy,  
          {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
],
     // exports:[UserService],
     imports: [ 
          PassportModule.register({
               defaultStrategy:'jwt'
          }),
          JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '30d' },
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
        exports: [
          JwtStrategy,
        PassportModule
     ]

})
export class UserModule{}
