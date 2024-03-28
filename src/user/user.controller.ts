import { Controller, Get,  Delete,  Param, Patch, Post, Req, Body, ParseIntPipe, NotFoundException  } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/user-update.dto";
import { Createuser } from "./dto/create-user.dto";
import { User } from "./scheams/user.schema";

@Controller('/user')
export class UserController{
    constructor(private userService: UserService){}
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll()
    }

   
    

   @Post('')
   async createUser(@Body() user: Createuser): Promise<User> {
    return this.userService.create(user)
   }
   @Get('/:id')
   async getUsersById(@Param('id') id: string): Promise<User> {
       return this.userService.findById(id)
   }

//    store(@Body() createuser: Createuser){
//     // console.log(req.body);
    
//     return this.userService.create(createuser)
//    }
    @Patch('/:id')
    update(@Body() updateDto: UpdateUserDto, @Param() param: {id: number}){
        // console.log(req);
        
        return this.userService.update(updateDto, param)
    }
    @Get('/:id')
    getUser(@Param('id',ParseIntPipe) id: number){
        return this.userService.show(id)
    }
    @Delete('/:id') 
    async deleteUser(@Param('id') id: string): Promise<User> {
        const deletedUser = await this.userService.deleteById(id);

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return deletedUser;

}}