import axios, {AxiosRequestConfig} from "axios";
import {
    IsEnum,
    IsOptional
} from 'class-validator';
import {validateObject} from "../server/utils";
import {UserAuthData} from "./auth";
import * as appError from '../common/errors';
export interface ISearchMovieReq {
    title?: string,
    apikey: string,
}

enum EMovieFound {
    TRUE='True',
    FALSE='False',
}

enum EError {
    INVALID_API_KEY="Invalid API key!",
    MOVIE_NOT_FOUND="Movie not found!",
}

export class SearchMovieRes {
    @IsEnum(EMovieFound)
    Response!: EMovieFound;

    @IsEnum(EError)
    @IsOptional()
    Error?: EError;

    Title!: string;
    Released!: number;
    Genre!: string;
    Director!: string;
}

export async function GetMovies(arg: ISearchMovieReq) : Promise<SearchMovieRes> {
    const { data } = await axios.get<any, any, any>('https://www.omdbapi.com/', {
            params: {
                t: arg.title,
                apikey: arg.apikey,
            },
        }
    );
    if (typeof data === 'object') {
        const errors = await validateObject(SearchMovieRes, data);
        if (errors.length === 0) {
            let req: SearchMovieRes = data;
            if (EMovieFound.FALSE === req.Response) {
                switch (req.Error) {
                    case EError.INVALID_API_KEY: {
                        throw new appError.Unknown('Invalid omdb API key.');
                        break;
                    }
                    case EError.MOVIE_NOT_FOUND: {
                        throw new appError.NotFound('Movie not found.');
                        break;
                    }
                    default: {
                        break;
                    }

                }
            }
            return req;
        }
    }
    throw new appError.Unknown('Response from omdb is invalid.');
}