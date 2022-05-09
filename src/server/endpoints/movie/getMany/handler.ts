import * as express from 'express';

import {
    GetMovieReq,
    GetMovieRes,
} from "./types";

import {
    _RegisterEndPoint
} from '../../../utils';

import {
    AppResponseAuthenticated,
    HTTP_METHODS
} from '../../../common';

import {
    movie
} from '../../../../storage/api'
import {authGuard} from "../../../middlewares";
import {IMovie} from '../types';

async function GetManyMovies (
    req: express.Request<any, any, GetMovieReq>,
    res: AppResponseAuthenticated <GetMovieRes>,
    next: express.NextFunction) {
    try {
        const {all_count, movies} =
            await movie.getMovie({
                user_id: res.locals.userAuthData.userId,
            });
        const response : IMovie[] = movies.map((stMovie) => {
            return {
                    uuid: stMovie.uuid,
                    created_at: stMovie.created_at,
                    updated_at: stMovie.updated_at,
                    title: stMovie.title,
                    released: stMovie.released,
                    genre: stMovie.genre,
                    director: stMovie.director,
                }
        });
        res.send({
            movies: response
        });
    } catch(err) {
        next(err);
    }
};

export function RegisterGetManyEndPoint(express: express.Express) {
    _RegisterEndPoint(
        express,
        '/movies',
        HTTP_METHODS.GET,
        GetMovieReq,
        GetMovieRes,
        GetManyMovies,
        [authGuard]
    );
}