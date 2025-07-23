import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;
}
