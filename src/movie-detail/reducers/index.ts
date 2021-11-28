import { LoadingState } from '../../globals';
import { 
  REQUEST_MOVIE, 
  GET_MOVIE,
  FAILED_MOVIE_FETCH,
  DetailAction
} from '../actions';
import { Movie } from '../../types';

export interface DetailState {
  movie?: Movie;
  loadingMoviesState: LoadingState;
  slug?: string;
}

const initialState: DetailState = {
  movie: <Movie>{},
  loadingMoviesState: LoadingState.loading,
  slug: ''
};

export const detailHandling = (state: DetailState = initialState, action: DetailAction): DetailState => {
  switch (action.type) {
    case REQUEST_MOVIE:
      return {
        ...state,
        loadingMoviesState: LoadingState.loading,
        slug: action.slug
      }
    case GET_MOVIE:
      return Object.assign({}, {
        ...state,
        loadingMoviesState: LoadingState.completed,
        movie: action.movie
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