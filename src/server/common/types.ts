import * as express from 'express';
import {
    UserAuthData
} from "../../connectors/auth";

export interface AppResponse<T1 = any> extends express.Response<T1, {
    userAuthData: UserAuthData | null
}> {
}

export interface AppResponseAuthenticated<T1 = any> extends express.Response<T1, {
    userAuthData: UserAuthData
}> {
}

export enum HTTP_METHODS {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
}

