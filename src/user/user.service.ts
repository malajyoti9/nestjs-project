import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable() //makes this page as a provider/service
export class UserService {
  constructor(
    //connecting your service to mongodb database and perform crud
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.userModel(createUserDto);
    return created.save(); //save() is mongoose query
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); //find/exec() is mongoose query
  }

  findOne(name: string) {
    return this.userModel.findOne({ name: name }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    Object.assign(user, updateUserDto);
    return user.save(); // persist changes
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (deletedUser !== null) return null;
    return deletedUser;
  }
}
