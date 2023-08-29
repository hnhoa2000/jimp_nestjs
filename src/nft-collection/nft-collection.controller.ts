import { Body, Controller, Get, Post } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';

@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly nftCollectionService: NftCollectionService) {}

  @Get('/abc')
  async abc() {
    return this.nftCollectionService.blitVariants();
  }

  @Post('/test')
  async test(@Body() data: any) {
    return this.nftCollectionService.test(data);
  }
}
