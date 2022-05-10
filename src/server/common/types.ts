import * as express from 'express';
import {
    UserAuthData
} from "../../connectors/auth";

export interface AppResponse<T1 = any> extends express.Response<T1, {
    userAuthData: UserAuthData | null,
    data: any,
    code: number | undefined
}> {
}

export interface AppResponseAuthenticated<T1 = any> extends express.Response<T1, {
    userAuthData: UserAuthData,
    data: any,
    code: number | undefined
}> {
}

export enum HTTP_METHODS {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
}

