import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {
    EnvironmentVariables
} from '../../env'
import {
    UserAuthData
} from "../../connectors/auth";

import {
    validateObject
} from '../utils'

export async function authenticate(
    req: express.Request,
    res: express.Response,
    next: any,
    ) {

    const authHeader = req.headers.authorization;
    if (undefined !== authHeader &&
        authHeader.startsWith("Bearer ")
        ) {
        const token = authHeader.substring(7, authHeader.length);
        try {
            jwt.verify(token, String(EnvironmentVariables.server.JWT_SECRET));
        } catch(err) {
            next("INVALID_TOKEN");
            return;
        }
        let userAuthData = jwt.decode(token);
        const errors = await validateObject(UserAuthData, userAuthData);
        if (errors.length > 0) {
            console.log(errors);
            next("INVALID_TOKEN_VALUE");
            return;
        }

        console.log(Date.now(), userAuthData);
        if ((userAuthData as UserAuthData).exp < Date.now() / 1000) {
            next("EXPIRED_TOKEN");
            return;
        }

        res.locals.userAuthData = userAuthData;
        console.log(userAuthData);
        next();
        return;
    }
    res.locals.userAuthData = null;
    next();
}