import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class SignupAuthDTO extends CreateUserDto {}

export class SigninAuthDTO {
  @IsEmail()
  @ApiProperty({})
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
