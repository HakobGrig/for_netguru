import {
    Length,
    IsUUID,
} from 'class-validator';

export class CreateMovieReq {
    @Length(1, 30)
    title!: string;
}

export class CreateMovieRes {
    @Length(1, 30)
    @IsUUID('4')
    uuid!: string
}
