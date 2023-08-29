import { AppConfig } from '../config.type';

const config: AppConfig = {
  DATABASE_URL: 'mongodb://localhost:27017/jimp',
  REDIS_URL: 'redis://:@34.124.197.66:6000',
  MESEA_PORTAL_URL: 'https://staging-api.mesea.io',
  PUBLIC_URL: 'http://localhost:4000',
  MAIL_HOST: 'smtp.gmail.com',
  MAIL_PORT: 587,
  MAIL_USERNAME: 'cris.nguyen@vonic.vn',
  MAIL_PASSWORD: 'czhncqvazlwqcloa',
  TELEGRAM_BOT_PORTAL_URL: '',
  TELEGRAM_CHAT_ID: '',
};

export default config;
