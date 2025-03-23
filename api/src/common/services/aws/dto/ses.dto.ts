import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { EmailTemplateEnum } from 'src/common/constants/email-templates.constant';

export class CreateTemplateDTO {
  // @IsObject()
  @IsString()
  @IsOptional()
  htmlBody: string;

  @IsString()
  @IsOptional()
  textBody: string;

  @IsString()
  @IsNotEmpty()
  templateSubject: string;

  @IsString()
  @IsString({})
  // @IsEnum(EmailTemplateEnum) // for now we gonna customize it to only those 3 email templates
  templateName: keyof typeof EmailTemplateEnum; // make it string
}

export class UpdateTemplateDTO extends CreateTemplateDTO {}

export class SendSESEmailDTO {
  @IsEnum(EmailTemplateEnum)
  templateType: EmailTemplateEnum;

  @IsString()
  @IsNotEmpty()
  templateName: keyof typeof EmailTemplateEnum; // The name of an existing template in Amazon SES.

  // @IsUrl()
  @IsString()
  @IsNotEmpty()
  link: string; // reset/verify link u send with the email  >> here will be otp

  @IsOptional()
  @IsString()
  @IsNotEmptyObject()
  templateData?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsNotEmpty()
  @IsEmail(null, { each: true })
  @IsArray()
  @MaxLength(50) // reciepients can't exceed 50 at a time
  @ArrayNotEmpty()
  ToAddresses: string[];

  @IsOptional()
  @IsEmail(null, { each: true })
  @IsArray()
  cc?: string[];

  @IsString()
  url: string;
}
