import { Controller, Get } from '@nestjs/common';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Get()
  async test() {
    return this.ipfsService.test(
      'C:/Users/Administrator/Pictures/midjourney/1.png',
    );
  }
}
