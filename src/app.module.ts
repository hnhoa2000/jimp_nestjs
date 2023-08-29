import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JimpModule } from './jimp/jimp.module';
import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from './database';

@Module({
  imports: [
    ConfigModule,
    JimpModule,
    NftCollectionModule,
    IpfsModule,
    CacheModule.register({ isGlobal: true }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
