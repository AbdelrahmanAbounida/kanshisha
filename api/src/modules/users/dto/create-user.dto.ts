import { IsEmail, IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';
import { USER_ROLE_ENUM } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  // @Min(4)
  @IsString()
  @ApiProperty()
  password: string;

  // @Transform(({ value }) => value ?? USER_ROLE_ENUM.USER)
  @IsEnum(USER_ROLE_ENUM)
  @ApiProperty({
    description: 'User Role',
    default: USER_ROLE_ENUM.USER,
  })
  role: USER_ROLE_ENUM;
}
