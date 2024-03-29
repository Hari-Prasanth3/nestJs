import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

import config from './config/keys';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './user/constants';

@Module({
  controllers: [AppController, AuthController],
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService],
})
export class AppModule {}
