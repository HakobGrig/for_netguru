import {
    Length,
} from 'class-validator';

export class GetMovieReq {
}

export class GetMovieRes {
    @Length(1, 30)
    title!: string;
}
