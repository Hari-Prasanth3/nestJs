import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Createuser } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose'
import { Loginuser } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService) { }


    generateToken(id: string,email:string): string {
        const payload = { UserId: id, email: email };
        return this.jwtService.sign(payload); 
    }

    // get all users
    async findAll(): Promise<User[]> {
        const users = await this.userModel.find();
        // console.log(users);
        
        return users
    }


  
//  create user
async create(createUserDto: Createuser): Promise<{ user: User; token: string }> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();

    const token = this.generateToken(savedUser.id,savedUser.email);

    return { user: savedUser, token }; 
  }

    
async login(create: Loginuser): Promise<{user: User; token: string}> {
    const user = await this.userModel.findOne({ email: create.email });
    if (!user) {
        throw new ConflictException('user not found');
    }
    const token = this.generateToken(user.id, user.email)
    console.log(user,token);
    
    return { user, token}
}
    

    // user find by id
    async findById(id: string): Promise<User> {
        const res = await this.userModel.findById(id)
        if (!res) {
            throw new NotFoundException('user is not found')
        }
        return res;
    }


// update the user
    async update(updateDto: UpdateUserDto, { id }: { id: string }): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (updateDto.email !== undefined) {
            user.email = updateDto.email;
        }
        await user.save();

        return user;
    }

   
   
//   delete the user
    async deleteById(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return deletedUser
    }
}
