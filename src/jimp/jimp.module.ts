import { Module } from '@nestjs/common';
import { JimpController } from './jimp.controller';
import { JimpService } from './jimp.service';

@Module({
  controllers: [JimpController],
  providers: [JimpService],
  exports: [JimpService],
})
export class JimpModule {}
