import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JimpModule } from './jimp/jimp.module';
import { NftCollectionModule } from './nft-collection/nft-collection.module';

@Module({
  imports: [JimpModule, NftCollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
