import * as express from 'express';

import {
    _RegisterEndPoint
} from '../../../utils';

import {
    AppResponse,
    HTTP_METHODS
} from '../../../common';

import {
    CreateMovieReq,
    CreateMovieRes,
} from "./types";

import {
    authGuard
} from '../../../middlewares/'
import {
    movie
} from '../../../../storage/api'

async function CreateMovie (
    req: express.Request<any, any, CreateMovieReq>,
    res: AppResponse <CreateMovieRes>) {
    const uuid = await movie.createMovie({});
    console.log(res.locals);
    res.send({
        uuid: uuid.uuid
    });
    // res.locals.userAuthData.iat = 123;
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