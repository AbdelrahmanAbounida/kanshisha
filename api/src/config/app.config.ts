import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { validateConfig } from 'src/common/utils/validate-config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

interface AppConfigProps {
  nodeEnv: string;
  port: number;
  maintenance: boolean;
  api_key: string;
}

class AppConfigValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsBoolean()
  @IsOptional()
  MAINTENACE: boolean;

  @IsOptional()
  @IsString()
  API_KEY: string;
}

// register a namespace for these variables. ex: 'app.port'
export default registerAs<AppConfigProps>('app', () => {
  validateConfig(process.env, AppConfigValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    maintenance: process.env.MAINTENACE! === 'true',
    api_key: process.env.API_KEY,
  };
});
