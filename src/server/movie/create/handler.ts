import * as express from 'express';

import {
    _RegisterEndPoint
} from '../../utils';

import {
    HTTP_METHODS
} from '../../common';

import {
    CreateMovieReq,
    CreateMovieRes,
} from "./types";

function CreateMovie (
    req: express.Request<any, any, CreateMovieReq>,
    res: express.Response<CreateMovieRes>) {
    console.log(req.body);
    res.send({
        uuid: 'asd'
    });
};

export function RegisterCreateMovieEndPoint(express: express.Express) {
    _RegisterEndPoint(
        express,
        '/movies',
        HTTP_METHODS.POST,
        CreateMovieReq,
        CreateMovieRes,
        CreateMovie,
    );
}