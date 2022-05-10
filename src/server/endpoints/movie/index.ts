import Express from 'express';
import {
    RegisterCreateMovieEndPoint,
} from './create';
import {
    RegisterGetManyEndPoint
} from './getMany';

export function RegisterMovieEndPoints(express: Express.Express) {
    RegisterCreateMovieEndPoint(express);
    RegisterGetManyEndPoint(express);
}