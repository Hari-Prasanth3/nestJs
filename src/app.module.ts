import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';


import config from './config/keys'
@Module({
 controllers:[AppController],
 imports: [MongooseModule.forRoot(config.mongoURI), UserModule, ],
 providers: [],
})
export class AppModule {}
