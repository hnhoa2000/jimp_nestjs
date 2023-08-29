import { Injectable } from '@nestjs/common';
import { AppConfig, EnvType } from './config.type';
import infos from '../../package.json';
import developEnvs from './envs/develop.envs';
import stagingEnvs from './envs/staging.envs';
import betaEnvs from './envs/beta.envs';
import productionEnvs from './envs/production.envs';
import { Logger } from '@nestjs/common';

@Injectable()
export class ConfigService {
  APP_NAME: string;
  PORT: number;
  ENV: EnvType;
  envs: AppConfig;

  constructor() {
    // General
    this.APP_NAME = infos.name.toUpperCase();
    this.PORT =
      typeof process.env['PORT'] === 'undefined'
        ? 4000
        : Number(process.env['PORT']);
    this.ENV = Object.values(EnvType).includes(process.env['ENV'] as any)
      ? (process.env['ENV'] as EnvType)
      : EnvType.DEVELOP;

    Logger.log(``);
    Logger.log(`---------------- START ENVs ---------------- `);
    Logger.log(`APP_NAME: ${this.APP_NAME}`);
    Logger.log(`PORT: ${this.PORT}`);
    Logger.log(`ENV: ${this.ENV}`);

    // Specific
    if (this.ENV === EnvType.DEVELOP) this.envs = developEnvs;
    else if (this.ENV === EnvType.STAGING) this.envs = stagingEnvs;
    else if (this.ENV === EnvType.BETA) this.envs = betaEnvs;
    else if (this.ENV === EnvType.PRODUCTION) this.envs = productionEnvs;

    Object.keys(this.envs).map((key) => {
      // Validate external env
      if (typeof process.env[key] !== 'undefined') {
        this.envs[key] = process.env[key];
      }

      Logger.log(`${key}: ${this.envs[key]}`);
    });

    Logger.log(`---------------- END ENVs ---------------- `);
    Logger.log(``);
  }
}
