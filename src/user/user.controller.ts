import { Controller, Get,  Delete,  Param, Patch, Post,  Body,  NotFoundException, UseGuards} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Createuser } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";
import { Loginuser } from "./dto/login-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "./roles.guard";

@Controller('/user')
export class UserController{
    constructor(private userService: UserService){}

    // for get all users
    @Get()
        //Authorization using token
    // @UseGuards(AuthGuard('jwt'))

        //Authorization by roles
    @Roles("admin")

    @UseGuards(RolesGuard)
    async getAllUsers(): Promise<User[]> {        
        return this.userService.findAll()
    }

   
    
// for create user

@Post('/register')

async createUser(@Body() user: Createuser): Promise<{ user: User; token: string }> {
  return this.userService.create(user);
}

   @Post('/login')
   async loginUser(@Body() user:Loginuser): Promise<{user:User; token: string}> {
    return this.userService.login(user)
   }
//    for get user By id
   @Get('/:id')
   async getUsersById(@Param('id') id: string): Promise<User> {
       return this.userService.findById(id)
   }



// for update the user
    @Patch('/:id')

    update(@Body() updateDto: UpdateUserDto, @Param() param: {id: string}){
        // console.log(req);
        
        return this.userService.update(updateDto, param)
    }
   

//   for delete the user
    @Delete('/:id') 
    async deleteUser(@Param('id') id: string): Promise<User> {
        const deletedUser = await this.userService.deleteById(id);

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return deletedUser;

}}