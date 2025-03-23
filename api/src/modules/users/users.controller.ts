import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { CustomLogger } from '../../common/logging/app-logger';

// @UseGuards(AuthGuard('myjwt'))
// @Public()
// @Auth(USER_ROLE_ENUM.USER, true)
// @UsePipes(ValidationPipe)

@ApiSecurity('api-key')
@Controller({
  version: '1',
  path: 'users',
})
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: CustomLogger,
  ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    // ValidationPipe
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JWTAuthGuard)
  @Get('all')
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  // @Serialize(CreateUserDto) // different method to serialize the response
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      return new NotFoundException('There is no user with this id');
    }
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      return new NotFoundException('There is no user with this id');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    console.log({ user });
    if (!user) {
      return new NotFoundException('No user found');
    }

    return this.usersService.remove(id);
  }
}
