import { LoadingState } from '../../globals';
import { 
  REQUEST_SEARCH_MOVIES, 
  SEARCH_MOVIES,
  FAILED_SEARCH_MOVIE_FETCH,
  SET_SEARCH_TERM,
  SearchAction
} from '../actions';
import { Movie } from '../../types';

export interface SearchMoviesState {
  movies?: Movie[];
  loadingMoviesState?: LoadingState;
  searchTerm?: string | null;
}

const initialState: SearchMoviesState = {
  movies: [],
  loadingMoviesState: LoadingState.loading,
  searchTerm: ''
};

export const searchMovieHandling = (state: SearchMoviesState = initialState, action: SearchAction): SearchMoviesState => {
  switch (action.type) {
    case REQUEST_SEARCH_MOVIES:
      return {
        ...state,
        loadingMoviesState: LoadingState.loading
      }
    case SEARCH_MOVIES:
      return Object.assign({}, {
        ...state,
        loadingMoviesState: LoadingState.completed,
        movies: action.movies
      });
    case FAILED_SEARCH_MOVIE_FETCH:
      return {
        ...state,
        loadingMoviesState: LoadingState.failed
      }
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    default:
      return state
  }
};