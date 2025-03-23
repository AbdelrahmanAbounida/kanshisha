import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateConfig<T extends object>(
  config: Record<string, any>,
  EnvironmentVariables: ClassConstructor<T>,
) {
  /** This method to validate the env variables as the expected values types */

  const validatedConfig = plainToInstance(
    EnvironmentVariables, // class validator for env variables
    config, // exact loaded env variables from .env aka process.env
    {
      enableImplicitConversion: true,
    },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
