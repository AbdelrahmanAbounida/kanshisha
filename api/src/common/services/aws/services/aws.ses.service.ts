import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import {
  CreateTemplateDTO,
  SendSESEmailDTO,
  UpdateTemplateDTO,
} from '../dto/ses.dto';
import {
  CreateTemplateCommand,
  CreateTemplateCommandInput,
  CreateTemplateCommandOutput,
  DeleteTemplateCommand,
  DeleteTemplateCommandInput,
  DeleteTemplateCommandOutput,
  GetTemplateCommand,
  GetTemplateCommandInput,
  GetTemplateCommandOutput,
  ListTemplatesCommand,
  ListTemplatesCommandInput,
  ListTemplatesCommandOutput,
  SESClient,
  SendBulkTemplatedEmailCommand,
  SendBulkTemplatedEmailCommandInput,
  SendBulkTemplatedEmailCommandOutput,
  SendTemplatedEmailCommand,
  SendTemplatedEmailCommandInput,
  SendTemplatedEmailCommandOutput,
  UpdateTemplateCommand,
  UpdateTemplateCommandInput,
  UpdateTemplateCommandOutput,
} from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { CustomResponse } from 'src/common/response/custom-response';
import { EmailTemplateEnum } from 'src/common/constants/email-templates.constant';

@Injectable()
export class AwsSesService {
  private readonly sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: this.configService.get('aws.ses_smtp_access_key'),
        secretAccessKey: this.configService.get(
          'aws.ses_smtp_seret_access_key',
        ),
      },
      region: this.configService.get('aws.region'),
    });
  }

  async send(SendSESEmailDTO: SendSESEmailDTO): Promise<any> {
    // const  email_template = getTemplate({template:SendSESEmailDTO.templateType,url:SendSESEmailDTO.url})

    // 1- define command
    const emailParams = JSON.stringify({
      url: SendSESEmailDTO.link,
      userEmail: SendSESEmailDTO.ToAddresses[0],
    });
    console.log({ emailParams });
    const command: SendTemplatedEmailCommand = new SendTemplatedEmailCommand({
      Template: SendSESEmailDTO.templateName, // this gonna define the template from ses
      Destination: {
        ToAddresses: SendSESEmailDTO.ToAddresses,
        BccAddresses: [],
        CcAddresses: [],
      },
      Source: SendSESEmailDTO.sender,
      TemplateData: emailParams, //Optional data to pass to the template
      ReplyToAddresses: [],
    });

    try {
      const sendWithTemplate: SendTemplatedEmailCommandOutput =
        await this.sesClient.send<
          SendTemplatedEmailCommandInput,
          SendTemplatedEmailCommandOutput
        >(command);
      // console.log({sendWithTemplate})
      return new CustomResponse({
        message: 'Email has been sent successfully',
        error: false,
      });
    } catch (error) {
      console.error({ error });
      throw new BadRequestException('Failed to send Email ');
    }
  }

  async createTemplate(createTemplateDto: CreateTemplateDTO) {
    if (!createTemplateDto.htmlBody && !createTemplateDto.textBody) {
      throw new NotAcceptableException(
        'You have to provide either html/text template',
      );
    }

    const command: CreateTemplateCommand = new CreateTemplateCommand({
      Template: {
        TemplateName: createTemplateDto.templateName,
        HtmlPart: createTemplateDto.htmlBody,
        SubjectPart: createTemplateDto.templateSubject,
        TextPart: createTemplateDto.textBody,
      },
    });
    try {
      const create: CreateTemplateCommandOutput = await this.sesClient.send<
        CreateTemplateCommandInput,
        CreateTemplateCommandOutput
      >(command);

      return new CustomResponse({
        message: ` ${createTemplateDto.templateName} Email template has been created Successfully`,
        error: false,
      });
    } catch (error: any) {
      console.log({ error });
      throw new BadRequestException(
        'Something went wrong while creating this email template',
      );
    }
  }

  async getTemplate({
    name,
  }: {
    name: keyof typeof EmailTemplateEnum;
  }): Promise<GetTemplateCommandOutput> {
    const command: GetTemplateCommand = new GetTemplateCommand({
      TemplateName: name,
    });

    try {
      const getTemplate: GetTemplateCommandOutput = await this.sesClient.send<
        GetTemplateCommandInput,
        GetTemplateCommandOutput
      >(command);

      return getTemplate;
    } catch (error: any) {
      Logger.error({ error });
      throw new BadRequestException('Failed to retrieve this template ');
    }
  }

  async listTemplates(): Promise<ListTemplatesCommandOutput> {
    const command: ListTemplatesCommand = new ListTemplatesCommand({
      MaxItems: 3,
    });

    try {
      const listTemplate: ListTemplatesCommandOutput =
        await this.sesClient.send<
          ListTemplatesCommandInput,
          ListTemplatesCommandOutput
        >(command);
      return listTemplate;
    } catch (err: any) {
      throw err;
    }
  }

  async updateTemplate({
    htmlBody,
    templateName,
    templateSubject,
    textBody,
  }: UpdateTemplateDTO): Promise<UpdateTemplateCommandOutput> {
    if (!htmlBody && !textBody) {
      throw new NotAcceptableException(
        'You have to provide either html/text template',
      );
    }

    const command: UpdateTemplateCommand = new UpdateTemplateCommand({
      Template: {
        TemplateName: templateName,
        SubjectPart: templateSubject,
        HtmlPart: htmlBody,
        TextPart: textBody,
      },
    });

    try {
      const update: UpdateTemplateCommandOutput = await this.sesClient.send<
        UpdateTemplateCommandInput,
        UpdateTemplateCommandOutput
      >(command);

      return update;
    } catch (err: any) {
      throw err;
    }
  }

  async deleteTemplate({
    name,
  }: {
    name: keyof typeof EmailTemplateEnum;
  }): Promise<DeleteTemplateCommandOutput> {
    const command: DeleteTemplateCommand = new DeleteTemplateCommand({
      TemplateName: name,
    });

    try {
      const del: DeleteTemplateCommandOutput = await this.sesClient.send<
        DeleteTemplateCommandInput,
        DeleteTemplateCommandOutput
      >(command);

      return del;
    } catch (err: any) {
      throw err;
    }
  }

  async sendBulk<T>(SendSESEmailDTO: SendSESEmailDTO) {
    const command: SendBulkTemplatedEmailCommand =
      new SendBulkTemplatedEmailCommand({
        Template: SendSESEmailDTO.templateName,
        Destinations: SendSESEmailDTO.ToAddresses.map((e) => ({
          Destination: {
            ToAddresses: [e],
            BccAddresses: [],
            CcAddresses: [],
          },
          ReplacementTemplateData: JSON.stringify(
            SendSESEmailDTO.templateData ?? '',
          ),
        })),
        Source: SendSESEmailDTO.sender,
        ReplyToAddresses: [],
        DefaultTemplateData: JSON.stringify(SendSESEmailDTO.templateData ?? ''),
      });

    try {
      const sendBulkEmailsWithTemplate: SendBulkTemplatedEmailCommandOutput =
        await this.sesClient.send<
          SendBulkTemplatedEmailCommandInput,
          SendBulkTemplatedEmailCommandOutput
        >(command);
      return sendBulkEmailsWithTemplate;
    } catch (error) {
      Logger.error({ error });
      throw new BadRequestException(
        'Something went wrong while sending those emails',
      );
    }
  }
}
