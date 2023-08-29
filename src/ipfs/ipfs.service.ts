import { Injectable } from '@nestjs/common';
import { Web3Storage, getFilesFromPath } from 'web3.storage';

@Injectable()
export class IpfsService {
  private readonly token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2RkU1RGZmNThjOTQ3M2M0QzIyMjY0M0U2OUY3MDAxODg2MDJFMzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODg5NjE5ODUyMTEsIm5hbWUiOiJ0ZXN0SXBmcyJ9.Nxp56UYC8Ema6oA76RfrOXaiHcRQa_p0MBR4JPJb2ac'; // Replace with your actual token
  private readonly client: Web3Storage;

  constructor() {
    this.client = new Web3Storage({ token: this.token });
  }

  async test(path: string): Promise<string | null> {
    try {
      const files: any = await getFilesFromPath(path);
      const cid = await this.client.put(files);
      return `https://${cid}.ipfs.dweb.link/${files[0].name}`;
    } catch (error) {
      console.error('Error storing files:', error);
      return null;
    }
  }
}
