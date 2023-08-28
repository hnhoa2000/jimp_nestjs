import { Injectable } from '@nestjs/common';
import { readdir } from 'node:fs/promises';

@Injectable()
export class NftCollectionService {
  private directoryPath = 'public/image/C';
  private base = 'Peppa 1.png';
  async createArray() {
    const arrayResult = [];
    const dirs = await readdir(this.directoryPath);
    dirs.splice(dirs.indexOf(this.base));
    for (let index = 0; index < dirs.length; index++) {
      const dir = `${this.directoryPath}/${dirs[index]}`;
      const files = await readdir(dir);
      console.log(files);
    }
    return;
  }
}
