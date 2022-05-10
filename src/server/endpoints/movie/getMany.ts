import * as express from 'express';

import {RegisterEndPoint} from '../../utils';
import {authGuard} from '../../middlewares';
import {AppResponseAuthenticated, HTTP_METHODS} from '../../common';
import {movie} from '../../../storage/api';
import {IMovie} from './types';

export class GetMovieReq {}

export class GetMovieRes {
  movies!: IMovie[];
}
async function GetManyMovies(
  req: express.Request<unknown, unknown, GetMovieReq>,
  res: AppResponseAuthenticated<GetMovieRes>,
  next: express.NextFunction
) {
  const {movies} = await movie.getMovie({
    user_id: res.locals.userAuthData.userId,
  });
  const response: IMovie[] = movies.map(stMovie => {
    return {
      uuid: stMovie.uuid,
      created_at: stMovie.created_at,
      updated_at: stMovie.updated_at,
      title: stMovie.title,
      released: stMovie.released,
      genre: stMovie.genre,
      director: stMovie.director,
    };
  });

  res.locals.data = {
    movies: response,
  };
  next();
}

export function RegisterGetManyEndPoint(express: express.Express) {
  RegisterEndPoint(
    express,
    '/movies',
    HTTP_METHODS.GET,
    GetMovieReq,
    GetMovieRes,
    GetManyMovies,
    [authGuard]
  );
}
