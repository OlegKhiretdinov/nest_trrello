import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.services';
import { createUserDto } from './dto/createUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  userList() {
    return this.userService.list();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post()
  create(@Body() data: createUserDto) {
    return this.userService.create(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data) {
    return this.userService.update(id, data);
  }
}
