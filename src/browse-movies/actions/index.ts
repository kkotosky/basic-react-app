import axios from 'axios';
import { BASE_API_PATH } from '../../globals';
import { BrowseState, GroupedMovies } from '../reducers';
import { Movie } from '../../types';
import { ThunkDispatch } from 'redux-thunk';

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const FAILED_MOVIE_FETCH = 'FAILED_MOVIE_FETCH';
export const GET_MOVIES = 'GET_MOVIES';

export interface ActionBrowse {
  type: string;
  state: BrowseState;
  movies?: GroupedMovies[];
};

const groupMovies = (movies: Movie[]): GroupedMovies[] => {
  const grouped: {
    [key: string]: Movie[]
  } = {};
  movies.forEach((movie: Movie) => {
    movie.genres.forEach((genre: string) => {
      if (grouped[genre]) {
        grouped[genre].push(movie);
      } else {
        grouped[genre] = [movie];
      }
    });
  });
  const resp = Object.keys(grouped).map((val: string) => {
    return {
      genre: val,
      movies: grouped[val]
    }
  });
  return resp;
}

export const requestMovies = (state: BrowseState): ActionBrowse => ({
  state,
  type: REQUEST_MOVIES
});

export const failedMoviesFetch = (state: BrowseState): ActionBrowse => ({
  state,
  type: FAILED_MOVIE_FETCH
});

export const receivedMovies = (state: BrowseState, movies: GroupedMovies[]): ActionBrowse => ({
  type: GET_MOVIES,
  state,
  movies
});

export const fetchMovies = (state: BrowseState) => (dispatch: ThunkDispatch<BrowseState, any, ActionBrowse>): Promise<ActionBrowse> => {
  dispatch(requestMovies(state));
  return axios.get(BASE_API_PATH, {
    headers: {
      "Authorization": "Bearer Wookie2021"
    }
  })
    .then(response => response.data.movies)
    .then(movies => dispatch(receivedMovies(state, groupMovies(movies))))
    .catch(error => dispatch(failedMoviesFetch(state)))
};