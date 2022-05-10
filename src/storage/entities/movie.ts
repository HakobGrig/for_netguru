import {Column, Entity} from 'typeorm';
import {BaseEntity} from './base';

@Entity({
  name: 'movies',
})
export class Movie extends BaseEntity {
  @Column()
  title!: string;

  @Column({
    type: 'time without time zone',
  })
  released!: Date;

  @Column()
  genre!: string;

  @Column()
  director!: string;

  @Column()
  user_id!: number;
}
