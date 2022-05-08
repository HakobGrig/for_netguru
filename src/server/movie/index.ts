import Express from 'express';
import {
    RegisterCreateMovieEndPoint
} from './create/handler';

export function RegisterMovieEndPoints(express: Express.Express) {
    RegisterCreateMovieEndPoint(express);
}