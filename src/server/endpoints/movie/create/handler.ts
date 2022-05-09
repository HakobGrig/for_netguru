import * as express from 'express';

import {
    _RegisterEndPoint
} from '../../../utils';

import {
    AppResponse, AppResponseAuthenticated,
    HTTP_METHODS
} from '../../../common';

import {
    CreateMovieReq,
    CreateMovieRes,
} from "./types";

import {
    USER_ROLE
} from '../../../../connectors/auth';

import {
    authGuard
} from '../../../middlewares/'

import {
    movie
} from '../../../../storage/api'

async function CreateMovie (
    req: express.Request<any, any, CreateMovieReq>,
    res: AppResponseAuthenticated <CreateMovieRes>,
    next: express.NextFunction) {
    try {
        if (USER_ROLE.PREMIUM !== res.locals.userAuthData.role) {
            const from = new Date();
            from.setMonth(from.getUTCMonth() - 1);
            const user_movie_count_current_month =
                await movie.getMovie({
                    user_id: res.locals.userAuthData?.userId,
                    from,
                    to: new Date(),
                });
            if (user_movie_count_current_month.all_count >= 5) {
                next('LIMIT_REACHED');
                return;
            }
        }

        const uuid = await movie.createMovie({
            title: req.body.title,
            released: new Date(),
            director: 'director',
            genre: 'genre',
            user_id: res.locals.userAuthData.userId,
        });
        res.send({
            uuid: uuid.uuid
        });
    } catch(err) {
        next(err);
    }
};

export function RegisterCreateMovieEndPoint(express: express.Express) {
    _RegisterEndPoint(
        express,
        '/movies',
        HTTP_METHODS.POST,
        CreateMovieReq,
        CreateMovieRes,
        CreateMovie,
        [authGuard]
    );
}