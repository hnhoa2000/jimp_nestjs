import { Controller, Get } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';
import path from 'path';

@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly nftCollectionService: NftCollectionService) {}

  @Get()
  async createArray() {
    return this.nftCollectionService.createArray();
  }

  @Get('/abc')
  async abc() {
    const rare: number = 0
    return this.nftCollectionService.blitVariants(rare);
  }
}
