import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { UpdateUserDto } from './dto/user-update.dto';
import { Createuser } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './scheams/user.schema';
import * as mongoose from 'mongoose'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
    private userModel: mongoose.Model<User>,) {}

    async findAll(): Promise<User[]> {
     const users = await this.userModel.find();
     return users
    }
    get(){
        return {name: 'hari Prasanth', age: "20"}
    }
    // create(createuser: Createuser){
    //      return createuser
    // }
    async create(user: User): Promise<User> {
        const res = await this.userModel.create(user)
        return res;
    }
    async findById(id: string): Promise<User> {
        const res = await this.userModel.findById(id)
        if(!res){
throw new NotFoundException('user is not found')
        }
        return res;
    }



    update(updateDto: UpdateUserDto, param: {id: number}){
        return {body:updateDto, param}
    }
    show(id: number){
        return {id};
    }
    findByEmail(email:string){
        return this.userModel.findOne({ where: {email}})
    }
    delete(id: number){
        return {id};
    }
}
