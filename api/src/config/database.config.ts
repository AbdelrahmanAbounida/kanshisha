import { registerAs } from '@nestjs/config';
import { IsBoolean, isBoolean, IsOptional, IsString } from 'class-validator';
import { validateConfig } from 'src/common/utils/validate-config';

interface DatabaseConfigProps {
  mongoUrl: string;
  synchronize?: boolean;
}

class DatabaseConfigValidator {
  @IsString()
  DATABASE_MONGO_URL: string;

  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE?: boolean;
}

// main config function
export default registerAs<DatabaseConfigProps>('database', () => {
  validateConfig(process.env, DatabaseConfigValidator);

  return {
    mongoUrl: process.env.DATABASE_MONGO_URL!,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  };
});
