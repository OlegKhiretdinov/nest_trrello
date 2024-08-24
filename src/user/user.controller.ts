import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.services';
import { createUserDto, updateUserDto } from './dto/createUser.dto';
import { Public } from 'src/auth/auth.guard';
import { SameUserGuard } from 'src/authorization/sameUser.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  userList() {
    return this.userService.list();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Public()
  @Post()
  create(@Body() data: createUserDto) {
    return this.userService.create(data);
  }

  @UseGuards(SameUserGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @UseGuards(SameUserGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: updateUserDto) {
    return this.userService.update(id, data);
  }
}
