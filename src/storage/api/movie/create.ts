import {
    ds
} from '../../index'

import {
    Movie
} from '../../entities/movie'

import {
    GenerateUUID
} from '../../../utils';

interface ICreateMovieArgs {

}

interface ICreateMovieRet {
    uuid: string;
}

export async function createMovie(args: ICreateMovieArgs) : Promise<ICreateMovieRet> {
    const movie = new Movie(GenerateUUID());
    movie.genre = 'genre';
    movie.title = 'title';
    movie.director = 'director';
    movie.released = new Date();
    await ds.getRepository(Movie).save(movie);
    return { uuid: movie.uuid };
}
