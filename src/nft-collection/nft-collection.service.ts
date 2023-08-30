import { Inject, Injectable, Logger } from '@nestjs/common';
import { JimpService } from 'src/jimp/jimp.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { NftCollectionEntity } from './entity/nft-collection.entity';
import { IpfsService } from 'src/ipfs/ipfs.service';

@Injectable()
export class NftCollectionService {
  constructor(
    @InjectRepository(NftCollectionEntity)
    private readonly nftCollectionEntity: MongoRepository<NftCollectionEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jimpService: JimpService,
    private readonly ipfsService: IpfsService,
  ) {}
  private readonly logger = new Logger(NftCollectionService.name);

  async test(data: any) {
    const nftCollection = await this.nftCollectionEntity.findOneBy({
      tokenId: data.tokenId,
    });
    if (nftCollection) return 'tokenId is exist';
    const totalVariants: any = await this.cacheManager.get('totalVariants');
    const randomNumber = Math.floor(Math.random() * totalVariants.length);
    const order = ['Background', 'C', 'Eye', 'Mouth', 'Item'];
    const arrayPath = order.map(
      (item) =>
        totalVariants[randomNumber].layers.find((layer) => layer.item === item)
          .path,
    );
    const path = await this.jimpService.blit(
      arrayPath,
      totalVariants[randomNumber].dna,
    );
    const imagePath = await this.ipfsService.test(path);
    const newNftCollection = new NftCollectionEntity();
    newNftCollection.dna = totalVariants[randomNumber].dna;
    newNftCollection.image = imagePath;
    newNftCollection.tokenId = data.tokenId;
    newNftCollection.metadata = data.metadata;
    newNftCollection.type = data.type;
    await this.nftCollectionEntity.save(newNftCollection);
    return newNftCollection;
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
    const totalVariants: any[] = [];

    const bases = await this.readListFolder('nft-materials');
    await Promise.all(
      bases.map(async (base) => {
        const items = await this.readListFolder(`nft-materials/${base}`);
        const basePath = `nft-materials/${base}/base.png`;
        const variants: any[] = [];

        const inspectItem = async (params: {
          index: number;
          prevData: { item: string; piece: string; path: string }[];
        }) => {
          if (!items[params.index])
            return variants.push({
              dna: `base-${base}@${params.prevData
                .reduce((output, layer) => {
                  output += `@${layer.piece}`;
                  return output;
                }, '')
                .replace('@', '')}`,
              layers: [
                { item: base, piece: base, path: basePath },
                ...params.prevData,
              ],
              properties: {
                base,
                ...params.prevData.reduce((output, layer) => {
                  output[layer.item.toLowerCase()] = layer.piece;
                  return output;
                }, {} as any),
              },
            });
          const pieces = await this.readFilesInFolder(
            `nft-materials/${base}/${items[params.index]}`,
          );
          for (let i = 0; i < pieces.length; i++) {
            const piece = pieces[i];
            const item = items[params.index];
            await inspectItem({
              index: params.index + 1,
              prevData: [
                ...params.prevData,
                {
                  item: items[params.index],
                  piece: `${piece.split('.')[0]}`,
                  path: `nft-materials/${base}/${item}/${piece}`,
                },
              ],
            });
          }
        };

        await inspectItem({ index: 0, prevData: [] });

        totalVariants.push(...variants);
      }),
    );

    await this.cacheManager.set('totalVariants', totalVariants, 10000000);
    return {
      total: totalVariants.length,
      variants: totalVariants,
    };
  }
}
