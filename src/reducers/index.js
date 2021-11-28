import { combineReducers } from 'redux';
import { searchMovieHandling } from '../search-movies/reducers';
import { detailHandling } from '../movie-detail/reducers';

const rootReducer = combineReducers({
  searchMovieHandling,
  detailHandling
});

export default rootReducer;
