import { registerAs } from '@nestjs/config';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { validateConfig } from 'src/common/utils/validate-config';

interface AWSConfigProps {
  // SES
  ses_smtp_access_key: string;
  ses_smtp_seret_access_key: string;
  ses_from_mail: string;
  ses_host: string; // in caseof node mailer
  ses_port: number; // in caseof node mailer
  region: string;
}

class AWSConfigValidator {
  @IsString()
  SES_SECRET_ACCESS_KEY: string;

  @IsString()
  SES_SMTP_ACCESS_KEY: string;

  @IsString()
  SES_REGION: string;

  @IsString()
  SES_FROM_MAIL: string;

  @IsString()
  SES_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  SES_PORT: number;
}

export default registerAs<AWSConfigProps>('aws', () => {
  const config = {
    ses_smtp_access_key: process.env.SES_SMTP_ACCESS_KEY2,
    ses_smtp_seret_access_key: process.env.SES_SECRET_ACCESS_KEY2,
    ses_from_mail: process.env.SES_FROM_MAIL,
    ses_host: process.env.SES_HOST,
    ses_port: parseInt(process.env.SES_PORT, 25),
    region: process.env.SES_REGION,
  };

  validateConfig(config, AWSConfigValidator);

  return config;
});
