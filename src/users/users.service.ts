import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
  // Injectable the User schema in our service file
  constructor(
    @InjectModel(User.name) private readonly userModule: Model<UserDocument>,
  ) {}

  // Get all Users
  async findAll(): Promise<User[]> {
    return this.userModule.find().exec();
  }

  // Get Single USer
  findOne(id: string): Promise<User> {
    return this.userModule.findById(id).exec();
  }

  // Create User
  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = new this.userModule(createUserDto);
    return user.save();
  }

  // Update User
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModule.findByIdAndUpdate(id, updateUserDto, {new: true});
    if (!user) {
      throw new HttpException(`User #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // Remove User
  async remove(id: string): Promise<User> {
    const user = await this.userModule.findByIdAndDelete(id);
    if (!user) {
      throw new HttpException(`User #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}