import axios from 'axios';
import { BASE_API_PATH } from '../../globals';
import { SearchMoviesState } from '../reducers';
import { Movie } from '../../types';
import { ThunkDispatch } from 'redux-thunk';

export const REQUEST_SEARCH_MOVIES = 'REQUEST_SEARCH_MOVIES';
export const FAILED_SEARCH_MOVIE_FETCH = 'FAILED_SEARCH_MOVIE_FETCH';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export interface SearchAction {
  type: string;
  state: SearchMoviesState;
  searchTerm?: string;
  movies?: Movie[];
};

export const requestSearchMovies = (state: SearchMoviesState): SearchAction => ({
  type: REQUEST_SEARCH_MOVIES,
  state
});

export const failedSearchMoviesFetch = (state: SearchMoviesState): SearchAction => ({
  type: FAILED_SEARCH_MOVIE_FETCH,
  state
});

export const receivedSearchMovies = (state: SearchMoviesState, movies: Movie[]): SearchAction => ({
  type: SEARCH_MOVIES,
  state,
  movies
});

export const setSearchState = (state: SearchMoviesState, searchTerm: string | null): SearchAction => {
  return ({
    type: SET_SEARCH_TERM,
    state,
    searchTerm: searchTerm ? searchTerm : ''
  })
};

export const fetchSearchMovies = (state: SearchMoviesState, searchTerm: string) => (dispatch: ThunkDispatch<SearchMoviesState, any, SearchAction>) => {
  dispatch(requestSearchMovies(state));
  return axios.get(`${BASE_API_PATH}?q=${searchTerm}`, {
    headers: {
      "Authorization": "Bearer Wookie2021"
    }
  })
    .then(response => response.data.movies)
    .then(movies => dispatch(receivedSearchMovies(state, movies)))
    .catch(error => dispatch(failedSearchMoviesFetch(state)))
};