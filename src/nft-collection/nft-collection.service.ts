import { Injectable } from '@nestjs/common';
import { readdir } from 'node:fs/promises';
import { JimpService } from 'src/jimp/jimp.service';

@Injectable()
export class NftCollectionService {
  constructor(private readonly jimpService: JimpService) {}
  private BackgroundPath = 'public/image/C/Background';
  private EyesPath = 'public/image/C/Eyes';
  private ItemsPath = 'public/image/C/Items';
  private MouthPath = 'public/image/C/Mouth';
  private base = 'Peppa1.png';
  private basePath = 'public/image/C/Peppa1.png';

  removeFileExtension(file: string) {
    return file.slice(0, file.lastIndexOf('.'));
  }

  async createArray() {
    const arrayResult = [];
    const arrayBackground = await readdir(this.BackgroundPath);
    const arrayEyes = await readdir(this.EyesPath);
    const arrayItems = await readdir(this.ItemsPath);
    const arrayMouth = await readdir(this.MouthPath);
    for (let i = 3; i < arrayBackground.length; i++) {
      for (let j = 4; j < arrayEyes.length; j++) {
        for (let k = 4; k < arrayItems.length; k++) {
          for (let l = 4; l < arrayMouth.length; l++) {
            const dna = `0${this.removeFileExtension(
              this.base,
            )}_1${this.removeFileExtension(
              arrayBackground[i],
            )}_2${this.removeFileExtension(
              arrayEyes[j],
            )}_3${this.removeFileExtension(
              arrayItems[k],
            )}_4${this.removeFileExtension(arrayMouth[l])}`;
            const object = {
              base: this.base,
              basePath: this.basePath,
              background: arrayBackground[i],
              backgroundPath: `${this.BackgroundPath}/${arrayBackground[i]}`,
              eyes: arrayEyes[j],
              eyesPath: `${this.EyesPath}/${arrayEyes[j]}`,
              items: arrayItems[k],
              itemsPath: `${this.ItemsPath}/${arrayItems[k]}`,
              mouth: arrayMouth[l],
              mouthPath: `${this.MouthPath}/${arrayMouth[l]}`,
              dna,
            };
            arrayResult.push(object);

            //save image
            const arrayImg = [];
            arrayImg.push(object.backgroundPath);
            arrayImg.push(this.basePath);
            arrayImg.push(object.eyesPath);
            arrayImg.push(object.mouthPath);
            arrayImg.push(object.itemsPath);
            await this.jimpService.blit(arrayImg, dna);
          }
        }
      }
    }
    return arrayResult;
  }
}
