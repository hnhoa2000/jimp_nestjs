import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JimpModule } from './jimp/jimp.module';

@Module({
  imports: [JimpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
