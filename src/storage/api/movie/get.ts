import {Movie} from '../../entities/movie';
import {ds} from '../../index';
import {IMovie} from './types';

interface IGetMoviesArgs {
  user_id?: number;
  from?: Date;
  to?: Date;
  offset?: number;
  limit?: number;
}

interface IGetMoviesRet {
  movies: IMovie[];
  all_count: number;
}

export async function getMovie(args: IGetMoviesArgs): Promise<IGetMoviesRet> {
  const query = ds.getRepository(Movie).createQueryBuilder();
  if (undefined !== args.user_id) {
    query.andWhere('user_id = :id', {id: args.user_id});
  }
  if (undefined !== args.from) {
    query.andWhere('created_at > :from', {from: args.from});
  }
  if (undefined !== args.to) {
    query.andWhere('created_at < :to', {to: args.to});
  }
  if (undefined !== args.offset) {
    query.skip(args.offset);
  }
  if (undefined !== args.limit) {
    query.take(args.limit);
  }

  const [all_count, movies] = await Promise.all([
    query.getCount(),
    query.getMany(),
  ]);
  return {all_count, movies};
}
