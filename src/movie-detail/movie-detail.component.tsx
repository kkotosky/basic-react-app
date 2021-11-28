
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import StarRateIcon from '@mui/icons-material/StarRate';
import { DetailAction, fetchMovie } from './actions';
import { connect } from 'react-redux'
import { LoadingState, showLoadingSpinner } from '../globals';
import { DetailState } from './reducers';
import { useParams } from 'react-router-dom';
import { ReactElement, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import './movie-detail.component.scss';

const getColor = (rating: number, starNumber: number): string => {
  return starNumber * 2 <= rating ? '#8B8000' : 'white';
}

const getDirectorString = (director: string): string => {
  return Array.isArray(director) ? director.join(', ') : director;
}

const DetailMovie = (props: any): ReactElement => {
  let { slug } = useParams();

  useEffect(() => {
    props.fetchMovie(props, slug);
  }, []);
  
  return (
    <div className='wookie-app_detail-movies-wrapper'>
      { 
        showLoadingSpinner(props.loadingMoviesState) &&
        <LoadingSpinner loading={props.loadingMoviesState === LoadingState.loading} 
                      failed={props.loadingMoviesState === LoadingState.failed} 
                      loadingMessage='Loading movie'
                      failedMessage='Failed to load movie. Please refresh the page to try again.'/>
      }
      {
        props.loadingMoviesState === LoadingState.completed && props.movie &&
        (<div className="wookie-app_detail-movies-section">
          <img className="util-m-r-8" src={props.movie.poster} alt={props.movie.title}></img>
          <div>
            <div className="top-row">
              {props.movie.title} ({props.movie.imdb_rating} / 10)
              <div className="stars">
                <StarRateIcon sx={{color: getColor(props.movie.imdb_rating, 1)}} fontSize="large"/>
                <StarRateIcon sx={{color: getColor(props.movie.imdb_rating, 2)}} fontSize="large"/>
                <StarRateIcon sx={{color: getColor(props.movie.imdb_rating, 3)}} fontSize="large"/>
                <StarRateIcon sx={{color: getColor(props.movie.imdb_rating, 4)}} fontSize="large"/>
                <StarRateIcon sx={{color: getColor(props.movie.imdb_rating, 5)}} fontSize="large"/>
              </div>
            </div>
            <div className="supplemental">
              <div className="util-m-b-8"> 
                {new Date(props.movie.released_on).toLocaleDateString()} | {props.movie.length} | { getDirectorString(props.movie.director) }
              </div>
              <div> Movie Description: {props.movie.overview} </div>
            </div>
          </div>
        </div>)
      }
      {
        props.loadingMoviesState === LoadingState.completed && !props.movie &&
        (<div className="message-display-state">
          Cannot find {slug} in our library of movies
        </div>)
      }
    </div>
  );
  
}
const mapStateToProps = (state: any): DetailState => {
  const {
    movie,
    loadingMoviesState
  }: DetailState = state.detailHandling;

  return {
    movie,
    loadingMoviesState
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<DetailState, any, DetailAction>) => {
  return {
    fetchMovie: (state: DetailState, slug: string) => {
      return dispatch(fetchMovie(state, slug));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
