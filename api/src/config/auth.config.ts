import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { validateConfig } from 'src/common/utils/validate-config';

interface AuthConfigProps {
  secretKey: string;
  defaultExpirationTime: string; // Eg: 60, "2 days", "10h", "7d"
}

class AuthConfigValidator {
  @IsOptional()
  @IsString()
  AUTH_SECRET_KEY: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ?? '2d')
  AUTH_DEFAULT_EXPIRATION_TIME: string;
}

export default registerAs<AuthConfigProps>('auth', () => {
  const config = {
    secretKey: process.env.AUTH_SECRET_KEY!,
    defaultExpirationTime:
      process.env.AUTH_DEFAULT_EXPIRATION_TIME?.toString() || '2d',
  };

  validateConfig(config, AuthConfigValidator);

  return config;
});
