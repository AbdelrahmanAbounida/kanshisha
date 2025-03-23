import { IsBoolean, IsString } from 'class-validator';

export class CustomResponse {
  @IsString()
  message: string;

  @IsBoolean()
  error?: boolean;

  constructor({ message, error }: { message: string; error: boolean }) {
    this.message = message;
    this.error = error;
  }
}
