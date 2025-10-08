import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userService.create(createUserDto);
      return {
        message: 'User created sucessfully',
        statusCode: HttpStatus.OK,
        data: createdUser,
      };
    } catch (error) {
      console.log('******************', error);
      if (error.code === 11000) {
        //throw error if email entered is duplicated
        throw new ConflictException(
          'A user with this email or username already exists.',
        );
      } else {
      }
      return {
        message: 'User Creation Failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK) // Sets the HTTP status code for success
  async findAll() {
    try {
      //catch errors
      const userList = await this.userService.findAll();
      if (userList) {
        return {
          //for sending message/code in response
          message: 'User list fetched successfully',
          statusCode: HttpStatus.OK,
          data: userList,
        };
      } else {
        return {
          message: 'User list fetched successfully',
          statusCode: HttpStatus.OK,
          data: [],
        };
      }
    } catch (error) {
      // Log the full error for debugging purposes (optional)
      console.error(error);

      // Return a custom error response object with status code 500
      return {
        message: 'An unexpected error occurred',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    try {
      const result = await this.userService.findOne(name);
      if (result) {
        return {
          message: 'User fetched successfully',
          statusCode: HttpStatus.OK,
          data: result || [],
        };
      }
    } catch (error) {
      return {
        message: 'User fetching failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      if (updatedUser) {
        return {
          message: 'User details updated ',
          statusCode: HttpStatus.OK,
        };
      }
    } catch (error) {
      console.log('*******************', error);
      return {
        message: 'User Updation Failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.userService.remove(id);
      if (deleted === null) {
        return {
          message: 'User Removed Successfully',
          statusCode: HttpStatus.OK,
          data: deleted,
        };
      } else {
        return {
          message: 'User Not Deleted',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
        };
      }
    } catch (error) {
      console.log('****************', error);
      return {
        message: 'User Not Deleted',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }
}
