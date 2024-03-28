import { Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";
@Controller()
export class AppController{
  @Get()
    getHello() {
return 'Hello world'
    }
  }
