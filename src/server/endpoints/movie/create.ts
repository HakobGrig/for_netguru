import * as express from 'express';
import {Length, IsUUID} from 'class-validator';

import {EnvironmentVariables} from '../../../env';
import * as appError from '../../../common/errors/';
import {RegisterEndPoint} from '../../utils';
import {authGuard} from '../../middlewares';
import {AppResponseAuthenticated, HTTP_METHODS} from '../../common';
import {movie} from '../../../storage/api';
import {USER_ROLE} from '../../../connectors/auth';
import * as omdb from '../../../connectors/omdb';

export class CreateMovieReq {
  @Length(1, 30)
  title!: string;
}

export class CreateMovieRes {
  @Length(1, 30)
  @IsUUID('4')
  uuid!: string;
}

async function CreateMovie(
  req: express.Request<unknown, unknown, CreateMovieReq>,
  res: AppResponseAuthenticated<CreateMovieRes>,
  next: express.NextFunction
) {
  if (USER_ROLE.PREMIUM !== res.locals.userAuthData.role) {
    const from = new Date();
    from.setMonth(from.getUTCMonth() - 1);
    const user_movie_count_current_month = await movie.getMovie({
      user_id: res.locals.userAuthData?.userId,
      from,
      to: new Date(),
    });
    if (user_movie_count_current_month.all_count >= 5) {
      throw new appError.LimitReached(
        'Basic users can post only 5 movies a month.'
      );
    }
  }
  const omdbMovie = await omdb.GetMovies({
    ...req.body,
    apikey: EnvironmentVariables.ombd.OMDB_KEY,
  });

  const uuid = await movie.createMovie({
    title: omdbMovie.Title,
    released: new Date(omdbMovie.Released),
    director: omdbMovie.Director,
    genre: omdbMovie.Genre,
    user_id: res.locals.userAuthData.userId,
  });
  res.locals.data = {
    uuid: uuid.uuid,
  };
  next();
}

export function RegisterCreateMovieEndPoint(express: express.Express) {
  RegisterEndPoint(
    express,
    '/movies',
    HTTP_METHODS.POST,
    CreateMovieReq,
    CreateMovieRes,
    CreateMovie,
    [authGuard]
  );
}
