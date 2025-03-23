import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'myjwt') {
  constructor(private configService: ConfigService) {
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // default: false
      secretOrKey: configService.get('auth.secretKey'),
    });
  }

  // custom validation method for the user
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
