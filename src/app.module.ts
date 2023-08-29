import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JimpModule } from './jimp/jimp.module';
import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { IpfsModule } from './ipfs/ipfs.module';

@Module({
  imports: [JimpModule, NftCollectionModule, IpfsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
