import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import config from './config/keys';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './user/constants';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    AuthModule,
  ],
  providers: [UserModule],
})
export class AppModule {}
