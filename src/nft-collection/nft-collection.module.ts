import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JimpModule } from 'src/jimp/jimp.module';
import { NftCollectionEntity } from './entity/nft-collection.entity';
import { NftCollectionController } from './nft-collection.controller';
import { NftCollectionService } from './nft-collection.service';

@Module({
  imports: [JimpModule, TypeOrmModule.forFeature([NftCollectionEntity])],
  controllers: [NftCollectionController],
  providers: [NftCollectionService],
})
export class NftCollectionModule {}
