import axios from 'axios';
import { BASE_API_PATH } from '../../globals';
import { DetailState } from '../reducers';
import { Movie } from '../../types';
import { ThunkDispatch } from 'redux-thunk';

export const REQUEST_MOVIE = 'REQUEST_MOVIES';
export const FAILED_MOVIE_FETCH = 'FAILED_MOVIE_FETCH';
export const GET_MOVIE = 'GET_MOVIE';

export interface DetailAction {
  state: DetailState;
  type: string;
  movie?: Movie;
  slug?: string;
}

export const requestMovies = (state: DetailState): DetailAction => ({
  type: REQUEST_MOVIE,
  state
});

export const failedMovieFetch = (state: DetailState): DetailAction => ({
  type: FAILED_MOVIE_FETCH,
  state
});

export const receivedMovie = (state: DetailState, movie: Movie | undefined): DetailAction => ({
  type: GET_MOVIE,
  state,
  movie: movie ? movie : undefined
});

const findMovie = (movies: Movie[], slug: string): Movie | undefined => {
  return movies.find((mov: Movie) => {
    return mov.slug === slug;
  });
}

export const fetchMovie = (state: DetailState, slug: string) => (dispatch: ThunkDispatch<DetailState, any, DetailAction>) => {
  dispatch(requestMovies(state));
  return axios.get(BASE_API_PATH, {
    headers: {
      "Authorization": "Bearer Wookie2021"
    }
  })
    .then(response => findMovie(response.data.movies, slug))
    .then(movie => dispatch(receivedMovie(state, movie)))
    .catch(error => dispatch(failedMovieFetch(state)))
};