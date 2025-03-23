export enum EmailTemplateEnum {
  REGISTER = 'REGISTER',
  FORGET_PASSWORD = 'FORGET_PASSWORD',
}

export const EmailTexts: { [key in keyof typeof EmailTemplateEnum]: string } = {
  FORGET_PASSWORD: '',
  REGISTER: '',
};
