import { Injectable } from '@nestjs/common';
import Jimp from 'jimp';

@Injectable()
export class JimpService {
  //làm mờ hình ảnh
  //radius: Đây là bán kính của bộ lọc mờ.
  //Giá trị càng cao thì hiệu ứng mờ càng mạnh. Thường được đo bằng pixel.
  async blur(res: any, url: string, radius: number) {
    const image = await Jimp.read(url);
    image.blur(radius);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //chồng (blit) một hình ảnh lên trên một hình ảnh khác
  async blit(res: any, destination: string, arrayImg: string[]) {
    const image = await Jimp.read(destination);
    for (let index = 0; index < arrayImg.length; index++) {
      const img = await Jimp.read(arrayImg[index]);
      image.blit(img, 0, 0);
    }
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //Thay đổi màu của ảnh
  //apply: lighten, brighten, darken,desaturate,saturate(0->100)
  //apply: greyscale,tint,shade,red,green,blue (amount) --- +:tăng, -:giảm
  //apply: spin(-360,360),hue,mix(color,amount),xor(color)
  async color(res: any, url: string, params: any) {
    const image = await Jimp.read(url);
    image.color(params);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  async contain(
    res: any,
    url: string,
    w: number,
    h: number,
    alignX: any,
    alignY: any,
  ) {
    const image = await Jimp.read(url);
    image.contain(w, h, alignX, alignY);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  async cover(
    res: any,
    url: string,
    w: number,
    h: number,
    alignX: any,
    alignY: any,
  ) {
    const image = await Jimp.read(url);
    image.cover(w, h, alignX, alignY);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //hiệu ứng lệch (displacement) trên hình ảnh bằng cách sử dụng một
  //hình ảnh lệch khác để tạo ra hiệu ứng biến dạng
  //map: hình ảnh lệch
  //offset: Giá trị lệch
  async displace(res: any, url: string, map: string, offset: number) {
    const image = await Jimp.read(url);
    const displacementMap = await Jimp.read(map);

    // Áp dụng hiệu ứng lệch bằng displacement map và offset
    image.displace(displacementMap, offset);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  // thuật toán dither để giảm số lượng màu sắc trong hình ảnh xuống 16-bit (RGB565)
  async dither(res: any, url: string) {
    const image = await Jimp.read(url);
    image.dither565();
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //Lật hình ảnh theo chiều ngang hoặc chiều dọc. Mặc định là ngang.
  //horizontal: Lật theo chiều ngang (true để lật, false để giữ nguyên).
  //vertical: Lật theo chiều dọc (true để lật, false để giữ nguyên).
  async flip(res: any, url: string, horizontal: boolean, vertical: boolean) {
    const image = await Jimp.read(url);
    image.flip(horizontal, vertical);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  // áp dụng bộ lọc Gaussian blur (mờ Gaussian) lên hình ảnh
  // sử dụng để làm mờ hình ảnh bằng cách làm giảm độ tương phản giữa các pixel gần nhau
  // r: Bán kính của bộ lọc Gaussian. Giá trị càng cao thì mức độ mờ càng tăng.
  async gaussian(res: any, url: string, r: number) {
    const image = await Jimp.read(url);
    image.gaussian(r);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //đảo ngược màu sắc của hình ảnh
  async invert(res: any, url: string) {
    const image = await Jimp.read(url);
    image.invert();
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  async mask(res: any, url: string) {
    console.log(res, url);
    return;
  }

  //Chuẩn hóa màu sắc của hình ảnh bằng cách tính toán biểu đồ.
  async normalize(res: any, url: string) {
    const image = await Jimp.read(url);
    image.normalize();
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  // In đoạn text lên ảnh với tọa độ (x,y)
  async print(res: any, url: string, text: string, x: number, y: number) {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const image = await Jimp.read(url);

    // In văn bản lên hình ảnh
    image.print(font, x, y, text);

    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //width: Chiều rộng mới của hình ảnh (hoặc Jimp.AUTO)
  //width: Chiều cao mới của hình ảnh (hoặc Jimp.AUTO)
  //không thể dùng jimp.AUTO cùng lúc cho witdh và height
  //mode:  Chế độ xử lý khi thay đổi kích thước.
  //Các giá trị có thể là nearest_neighbor,bilinear,bicubic,hermite,bezier,resize,cover.
  //Mặc định là "bilinear".
  async resize(
    res: any,
    url: string,
    witdh: number,
    height: number,
    mode: any,
  ) {
    const image = await Jimp.read(url);
    image.resize(witdh, height, mode);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //xoay hình ảnh một góc cụ thể theo hướng ngược chiều kim đồng hồ hoặc theo chiều kim đồng hồ.
  //degrees: Góc xoay. dương xoay theo chiều kim đồng hồ, âm xoay ngược chiều kim đồng hồ.
  async rotate(res: any, url: string, degrees: number) {
    const image = await Jimp.read(url);
    image.rotate(degrees);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //thay đổi tỉ lệ ảnh
  //number: tỉ lệ ảnh
  //mode(optional): cách thức của phương thức scale
  async scale(res: any, url: string, number: number, mode: any) {
    const image = await Jimp.read(url);
    image.scale(number, mode);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }

  //Chia tỷ lệ hình ảnh thành kích thước lớn nhất vừa với bên trong hình chữ nhật có
  //chiều rộng và chiều cao nhất định.
  async scaleToFit(
    res: any,
    url: string,
    width: number,
    height: number,
    mode: any,
  ) {
    const image = await Jimp.read(url);
    image.scaleToFit(width, height, mode);
    const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    return res.send(imgBuffer);
  }
}
