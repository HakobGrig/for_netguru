import * as express from 'express';

import {
    RegisterMovieEndPoints
} from './endpoints/movie/index';

import {
    authenticate, responseWrapper
} from "./middlewares";
import {RegisterMiddleware} from "./utils/register_middlware";
import {ErrorHandler} from "./middlewares/error_handler";


export async function init() {
    const app = express();
    app.use(express.json());
    const port = 3000;


    RegisterMiddleware(app,'*', [authenticate]);
    RegisterMovieEndPoints(app);

    app.use(responseWrapper);
    app.use(ErrorHandler);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}