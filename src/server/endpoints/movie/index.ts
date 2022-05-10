import express from 'express';
import {RegisterCreateMovieEndPoint} from './create';
import {RegisterGetManyEndPoint} from './getMany';

export function RegisterMovieEndPoints(express: express.Express) {
  RegisterCreateMovieEndPoint(express);
  RegisterGetManyEndPoint(express);
}
