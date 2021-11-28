import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import TitleCard from '../title-card/title-card.component';
import { ReactElement, useEffect } from 'react';
import { fetchSearchMovies, SearchAction } from './actions';
import { connect } from 'react-redux'
import { LoadingState, showLoadingSpinner } from '../globals';
import { SearchMoviesState } from './reducers';
import { Movie } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import './search-movies.component.scss';

const isNoMovies = (loadingState: LoadingState, movies: Movie[], searchTerm: string): boolean => {
  return loadingState === LoadingState.completed && 
    movies.length === 0 && 
    !!searchTerm;
}

const SearchMovies = (props: any): ReactElement => {

  useEffect(() => {
    if (props.searchTerm) {
      props.fetchSearchMovies(props, props.searchTerm);
    }
  }, [props.searchTerm]);

  return (
    <div className='wookie-search-movies-wrapper'>
      { 
        showLoadingSpinner(props.loadingMoviesState) && props.searchTerm &&
        <LoadingSpinner loading={props.loadingMoviesState === LoadingState.loading} 
                      failed={props.loadingMoviesState === LoadingState.failed} 
                      loadingMessage='Loading movies'
                      failedMessage='Failed to load movies. Please refresh the page to try again.'/>
      }
      {
        props.searchTerm === '' &&
        <div className="message-display-state">
          Please enter a search value
        </div> 
      }
      {
        isNoMovies(props.loadingMoviesState, props.movies, props.searchTerm) &&
        <div className="message-display-state">
          No movies match {props.searchTerm}
        </div> 
      }
      {
        props.loadingMoviesState === LoadingState.completed && props.movies.length &&
        <div className="search-movies_movies">
          {props.movies.map((movie: Movie, index: number) => {
            return <TitleCard key={index} movie={movie}></TitleCard>
          })}
        </div>
      }
    </div>
  );
  
}
const mapStateToProps: any = (state: any): SearchMoviesState => {
  const {
    movies,
    loadingMoviesState,
    searchTerm
  }: SearchMoviesState = state.searchMovieHandling;

  return {
    movies,
    loadingMoviesState,
    searchTerm
  }
}

const mapDispatchToProps: any = (dispatch: ThunkDispatch<SearchMoviesState, any, SearchAction>) => {
  return {
    fetchSearchMovies: (state: SearchMoviesState, searchTerm: string) => {
      return dispatch(fetchSearchMovies(state, searchTerm));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovies);
