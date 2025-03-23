import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninAuthDTO, SignupAuthDTO } from './dto/create-auth.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { isInstance } from 'class-validator';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupAuthDTO: SignupAuthDTO) {
    // 1- check if user already exists

    // 2- hashing password
    /**
     * 1- Generate salt (extra word/hash gonna be added to the hash to increase security)
     * 2- hash the salt and the password together
     * 3- join the salt and the hashed password+salt >> So that in the future we gonna know the salt
     * to use it in unhash
     */
    const salt = randomBytes(16).toString('hex');
    const password_salt_hash = (await scrypt(
      signupAuthDTO.password,
      salt,
      32,
    )) as Buffer;
    const joined_result = salt + '.' + password_salt_hash.toString('hex');

    // 3- create new user with the hashed password
    const newUser: User | HttpException = await this.userService.create({
      ...signupAuthDTO,
      password: joined_result,
    });

    if (isInstance(newUser, HttpException)) {
      return newUser;
    } else {
      // 4- return payload
      // return newUser;
      // return this.signIn({
      //   email: (newUser as User).email,
      //   password: (newUser as User).password,
      // });
      return newUser;
    }
  }

  async signIn(signinAuthDTO: SigninAuthDTO) {
    // 1- check if user exists
    const user = await this.userService.findUserByEmail(signinAuthDTO.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    //2- hash entered password
    const [salt, storedHash] = user.password.split('.');
    const EnteredHashedPassword = (await scrypt(
      signinAuthDTO.password,
      salt,
      32,
    )) as Buffer;

    // 3- compare passwords
    const isPasswordCorrect =
      storedHash === EnteredHashedPassword.toString('hex');

    if (isPasswordCorrect) {
      const payload = { sub: user.id, email: user.email, role: user.role };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException('Password incorrect');
  }
}
