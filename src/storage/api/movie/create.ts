import {ds} from '../../index';

import {Movie} from '../../entities/movie';

import {GenerateUUID} from '../../../common/utils';

import {IMovie} from './types';

interface ICreateMovieArgs {
  title: string;
  released: Date;
  genre: string;
  director: string;
  user_id: number;
}

type ICreateMovieRet = IMovie;

export async function createMovie(
  args: ICreateMovieArgs
): Promise<ICreateMovieRet> {
  const movie = new Movie(GenerateUUID());
  movie.title = args.title;
  movie.released = args.released;
  movie.genre = args.genre;
  movie.director = args.director;
  movie.user_id = args.user_id;
  await ds.getRepository(Movie).save(movie);
  return movie;
}
