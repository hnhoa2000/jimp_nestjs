import { Module } from '@nestjs/common';
import { JimpController } from './jimp.controller';
import { JimpService } from './jimp.service';

@Module({
  controllers: [JimpController],
  providers: [JimpService]
})
export class JimpModule {}
