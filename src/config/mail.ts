interface IMailConfig {
  driver: 'ethereal' | 'ses';
}

const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;

export { mailConfig };
