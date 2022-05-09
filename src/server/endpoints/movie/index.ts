import Express from 'express';
import {
    RegisterCreateMovieEndPoint,
} from './create/handler';
import {
    RegisterGetManyEndPoint
} from './getMany/handler';

export function RegisterMovieEndPoints(express: Express.Express) {
    RegisterCreateMovieEndPoint(express);
    RegisterGetManyEndPoint(express);
}