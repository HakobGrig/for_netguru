import {Column, PrimaryColumn} from 'typeorm';

export class BaseEntity {
  constructor(uuid: string) {
    this.uuid = uuid;
    const now = new Date();
    this.created_at = new Date(now);
    this.updated_at = new Date(now);
  }
  @PrimaryColumn()
  uuid: string;

  @Column({type: 'timestamptz', nullable: false})
  created_at: Date;

  @Column({type: 'timestamptz', nullable: false})
  updated_at: Date;
}
