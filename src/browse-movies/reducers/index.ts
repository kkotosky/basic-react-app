import { LoadingState } from '../../globals';
import { Movie } from '../../types';
import { 
  REQUEST_MOVIES, 
  GET_MOVIES,
  FAILED_MOVIE_FETCH,
  ActionBrowse
} from '../actions';

export interface GroupedMovies {
  genre: string;
  movies: Movie[];
};

export interface BrowseState {
  movies?: GroupedMovies[] | undefined;
  loadingMoviesState: LoadingState;
}

const initialState: BrowseState = {
  movies: [],
  loadingMoviesState: LoadingState.loading
};


export const movieHandling = (state: BrowseState = initialState, action: ActionBrowse): BrowseState => {
  switch (action.type) {
    case REQUEST_MOVIES:
      return {
        ...state,
        loadingMoviesState: LoadingState.loading
      }
    case GET_MOVIES:
      return Object.assign({}, {
        ...state,
        loadingMoviesState: LoadingState.completed,
        movies: action.movies
      });
    case FAILED_MOVIE_FETCH:
      return {
        ...state,
        loadingMoviesState: LoadingState.failed
      }
    default:
      return state
  }
};