import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator'; // performs validations
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString() //looks same as schema but class-validators are not supported in schema
  name: string;

  @ApiProperty() //Swagger will now show field names, types, and required/optional status.
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty()
  @IsString()
  address: string;
  // @IsOptional()
  // age?: number;
}
