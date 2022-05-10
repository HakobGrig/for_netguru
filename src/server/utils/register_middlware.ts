import {ErrorCatcher} from "./error_catcher";
import * as express from 'Express';

export function RegisterMiddleware(
    express: express.Express,
    path: string,
    middlewares: ((req: express.Request, res: express.Response, next: any)=> void)[]
) {
    middlewares.forEach((el) => {
        express.use(path, ErrorCatcher.bind(null, el))
    });
}
