import { Module } from '@nestjs/common';
import { AwsSesService } from './services/aws.ses.service';

@Module({
  controllers: [],
  providers: [AwsSesService],
  exports: [AwsSesService],
})
export class AwsModule {}
