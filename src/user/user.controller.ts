import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CheckDuplicateUserDto } from './dto/check-duplicate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UsePipes(ValidationPipe)
  checkDuplicateUser(@Query() checkDuplicateUserDto: CheckDuplicateUserDto) {
    return this.userService.checkDuplicateUser(checkDuplicateUserDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
