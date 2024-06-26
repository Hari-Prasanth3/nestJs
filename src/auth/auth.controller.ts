import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Get()
    @UseGuards(AuthGuard()) 
    profile(){
        return {message:"Im from protected route"}
    }
}
