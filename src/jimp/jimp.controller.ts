import { Controller, Get, Res } from '@nestjs/common';
import Jimp from 'jimp';
import { JimpService } from './jimp.service';

@Controller('jimp')
export class JimpController {
  constructor(private readonly jimpService: JimpService) {}

  @Get('blur')
  async blur(@Res() res: Response) {
    return await this.jimpService.blur(res, 'src/image/6.png', 5);
  }

  @Get('/blit')
  async blit(@Res() res: Response) {
    return await this.jimpService.blit(res, './src/image/C/Peppa 1.png', [
      './src/image/C/Eyes/eyes 1.png',
      './src/image/C/Mouth/mouth 1.png',
      './src/image/C/Items/item 1.png',
    ]);
  }

  @Get('color')
  async color(@Res() res: Response) {
    return await this.jimpService.color(res, './src/image/6.png', [
      { apply: 'red', params: [50] },
      { apply: 'green', params: [30] },
      { apply: 'blue', params: [10] },
      { apply: 'brighten', params: [50] },
    ]);
  }

  @Get('contain')
  async contain(@Res() res: Response) {
    return await this.jimpService.contain(
      res,
      './src/image/6.png',
      300,
      200,
      Jimp.HORIZONTAL_ALIGN_CENTER,
      Jimp.VERTICAL_ALIGN_MIDDLE,
    );
  }

  @Get('cover')
  async cover(@Res() res: Response) {
    return await this.jimpService.cover(
      res,
      './src/image/6.png',
      300,
      200,
      Jimp.HORIZONTAL_ALIGN_CENTER,
      Jimp.VERTICAL_ALIGN_MIDDLE,
    );
  }

  @Get('displace')
  async displace(@Res() res: Response) {
    return await this.jimpService.displace(
      res,
      './src/image/6.png',
      './src/image/E/bg 2.png',
      20,
    );
  }

  @Get('dither')
  async dither(@Res() res: Response) {
    return await this.jimpService.dither(res, './src/image/6.png');
  }

  @Get('flip')
  async flip(@Res() res: Response) {
    return await this.jimpService.flip(res, './src/image/6.png', true, false);
  }

  @Get('gaussian')
  async gaussian(@Res() res: Response) {
    return await this.jimpService.gaussian(res, './src/image/6.png', 5);
  }

  @Get('invert')
  async invert(@Res() res: Response) {
    return await this.jimpService.invert(res, './src/image/6.png');
  }

  @Get('mask')
  async mask(@Res() res: Response) {
    return await this.jimpService.mask(res, './src/image/6.png');
  }

  @Get('normalize')
  async normalize(@Res() res: Response) {
    return await this.jimpService.normalize(res, './src/image/6.png');
  }

  @Get('print')
  async print(@Res() res: Response) {
    return await this.jimpService.print(
      res,
      './src/image/6.png',
      'hello world',
      150,
      150,
    );
  }

  @Get('resize')
  async resize(@Res() res: Response) {
    return await this.jimpService.resize(
      res,
      './src/image/6.png',
      300,
      300,
      Jimp.RESIZE_BEZIER,
    );
  }

  @Get('rotate')
  async rotate(@Res() res: Response) {
    return await this.jimpService.rotate(res, './src/image/6.png', 90);
  }

  @Get('scale')
  async scale(@Res() res: Response) {
    return await this.jimpService.scale(
      res,
      './src/image/6.png',
      0.1,
      Jimp.RESIZE_BEZIER,
    );
  }

  @Get('scaleToFit')
  async scaleToFit(@Res() res: Response) {
    return await this.jimpService.scaleToFit(
      res,
      './src/image/6.png',
      700,
      900,
      Jimp.RESIZE_BEZIER,
    );
  }
}
