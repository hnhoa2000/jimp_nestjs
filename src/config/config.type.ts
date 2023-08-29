export enum EnvType {
  DEVELOP = 'develop',
  STAGING = 'staging',
  BETA = 'beta',
  PRODUCTION = 'production',
}

export interface AppConfig {
  DATABASE_URL: string;
  REDIS_URL: string;
  MESEA_PORTAL_URL: string;
  PUBLIC_URL: string;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_USERNAME: string;
  MAIL_PASSWORD: string;
  TELEGRAM_BOT_PORTAL_URL: string;
  TELEGRAM_CHAT_ID: string;
}
