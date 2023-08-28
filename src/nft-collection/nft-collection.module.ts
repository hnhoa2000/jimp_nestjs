import { Module } from '@nestjs/common';
import { JimpModule } from 'src/jimp/jimp.module';
import { NftCollectionController } from './nft-collection.controller';
import { NftCollectionService } from './nft-collection.service';

@Module({
  imports: [JimpModule],
  controllers: [NftCollectionController],
  providers: [NftCollectionService],
})
export class NftCollectionModule {}
