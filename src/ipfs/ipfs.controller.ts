import { Controller, Get } from '@nestjs/common';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Get()
  async test() {
    return this.ipfsService.test('public/image/1_C/Peppa1.png');
  }
}
