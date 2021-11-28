import { combineReducers } from 'redux';
import { detailHandling } from '../movie-detail/reducers';

const rootReducer = combineReducers({
  detailHandling
});

export default rootReducer;
