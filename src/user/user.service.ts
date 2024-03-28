import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
  
   
    // async create(user: User): Promise<User> {
    //     const res = await this.userModel.create(user)
    //     return res;
    // }

    async create(createUserDto: Createuser): Promise<User> {
        // Check if email already exists in the database
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        // Create the user if email is unique
        const newUser = new this.userModel(createUserDto);
        console.log(newUser);
        
        return newUser.save();
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
   async deleteById(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return deletedUser;
    }
}
