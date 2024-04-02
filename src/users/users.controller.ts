import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { isValidObjectId } from 'mongoose';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  // Add user service in constructor
  constructor(private readonly userService: UsersService) {}

  @Get() // Handle get all user route
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id') // Handle get a single user
  async getUser(@Param('id') userId: string) {
    if (!isValidObjectId(userId))
      throw new HttpException('User ID is not valid', HttpStatus.BAD_REQUEST);
    const user = await this.userService.findOne(userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Post() // Create a user
  AddUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id') // Update all user info
  updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(userId))
      throw new HttpException('User ID is not valid', HttpStatus.BAD_REQUEST);
    return this.userService.update(userId, updateUserDto);
  }

  @Patch(':id') // Update some user info
  patchUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(userId)) throw new HttpException('User ID is not valid', HttpStatus.BAD_REQUEST);
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':id') // Delete a user
  removeUser(@Param('id') userId: string) {
    if (!isValidObjectId(userId)) throw new HttpException('User ID is not valid', HttpStatus.BAD_REQUEST);
    return this.userService.remove(userId);
  }
}