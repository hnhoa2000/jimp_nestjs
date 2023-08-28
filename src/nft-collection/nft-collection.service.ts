import { Injectable, Logger } from '@nestjs/common';
import { readdir } from 'node:fs/promises';
import { JimpService } from 'src/jimp/jimp.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class NftCollectionService {
  constructor(private readonly jimpService: JimpService) { }
  private BackgroundPath = 'public/image/C/Background';
  private EyesPath = 'public/image/C/Eyes';
  private ItemsPath = 'public/image/C/Items';
  private MouthPath = 'public/image/C/Mouth';
  private base = 'Peppa1.png';
  private basePath = 'public/image/C/Peppa1.png';

  removeFileExtension(file: string) {
    return file.slice(0, file.lastIndexOf('.'));
  }
  private readonly logger = new Logger(NftCollectionService.name);
  private directoryPath = 'public/image/C';

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
            const dna = `${this.removeFileExtension(
              this.base,
            )}${this.removeFileExtension(
              arrayBackground[i],
            )}${this.removeFileExtension(
              arrayEyes[j],
            )}${this.removeFileExtension(
              arrayItems[k],
            )}${this.removeFileExtension(arrayMouth[l])}`;
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

  async readListFolder(parentFolder: string) {
    try {
      const files = await fs.readdir(parentFolder);
      const subFolders = await Promise.all(
        files.map(async (file) => {
          const fullPath = path.join(parentFolder, file);
          const stat = await fs.stat(fullPath);
          if (stat.isDirectory()) {
            return file;
          }
        }),
      );
      return subFolders.filter(Boolean);
    } catch (err) {
      this.logger.error('Error reading directory:', err);
      throw err;
    }
  }

  async readFilesInFolder(parentFolder: string) {
    try {
      const files = await fs.readdir(parentFolder);
      const subFolders = await Promise.all(
        files.map(async (file) => {
          const fullPath = path.join(parentFolder, file);
          const stat = await fs.stat(fullPath);
          if (!stat.isDirectory()) {
            return file;
          }
        }),
      );
      return subFolders.filter(Boolean);
    } catch (err) {
      this.logger.error('Error reading directory:', err);
      throw err;
    }
  }

  async blitVariants() {
    let totalVariants: any[] = [];

    const bases = await this.readListFolder('nft-materials');
    await Promise.all(bases.map(async (base) => {
      const items = await this.readListFolder(`nft-materials/${base}`);
      const basePath = `nft-materials/${base}/base.png`;
      let variants: any[] = [];

      const inspectItem = async (params: { index: number, prevData: { item: string, piece: string, path: string }[] }) => {
        if (!items[params.index]) return variants.push({
          dna: `base-${base}@${params.prevData.reduce((output, layer) => {
            output += `@${layer.piece}`;
            return output
          }, '').replace('@', '')}`,
          layers: [
            { item: base, piece: base, path: basePath },
            ...params.prevData,
          ],
          properties: {
            base,
            ...params.prevData.reduce((output, layer) => {
              output[layer.item.toLowerCase()] = layer.piece;
              return output;
            }, {} as any)
          }
        });
        const pieces = await this.readFilesInFolder(`nft-materials/${base}/${items[params.index]}`);
        for (let i = 0; i < pieces.length; i++) {
          const piece = pieces[i];
          const item = items[params.index];
          await inspectItem({
            index: params.index + 1, prevData: [...params.prevData, {
              item: items[params.index],
              piece: `${piece.split('.')[0]}`,
              path: `nft-materials/${base}/${item}/${piece}`
            }]
          });
        }
      }

      await inspectItem({ index: 0, prevData: [] });

      totalVariants.push(...variants)
    }))

    return {
      total: totalVariants.length,
      variants: totalVariants
    }
  }
}
