import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class APIGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key missing');
    }

    if (apiKey === this.configService.get('app.api_key')) {
      return true;
    }
    throw new UnauthorizedException(
      "Invalid API key. Make sure you add it in the header, 'api-key'",
    );
  }
}
