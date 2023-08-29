import { TypeERC } from 'src/common/enum/nft-collection.enum';
import { Entity, ObjectIdColumn, Unique, ObjectId, Column } from 'typeorm';

@Entity('nft-collection')
@Unique('nft-collection-unique', ['tokenId'])
export class NftCollectionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  type: TypeERC;

  @Column()
  tokenId: string;

  @Column()
  metadata: any;

  @Column()
  dna: string;

  @Column()
  image: string;

  get id() {
    return this._id.toHexString();
  }
}
