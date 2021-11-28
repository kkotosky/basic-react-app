import { combineReducers } from 'redux';
import { movieHandling } from '../browse-movies/reducers';
import { searchMovieHandling } from '../search-movies/reducers';
import { detailHandling } from '../movie-detail/reducers';

const rootReducer = combineReducers({
  movieHandling,
  searchMovieHandling,
  detailHandling
});

export default rootReducer;
