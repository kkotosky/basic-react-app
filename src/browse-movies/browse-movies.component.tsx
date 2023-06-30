import Scroller  from './scroller/scroller.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import { ReactElement, useEffect, useState } from 'react';
import { ActionBrowse, fetchMovies } from './actions';
import { connect } from 'react-redux'
import { LoadingState, showLoadingSpinner } from '../globals';
import { BrowseState, GroupedMovies } from './reducers';
import { ThunkDispatch } from 'redux-thunk';
import './browse-movies.component.scss';

const BrowseMovies = (props: any): ReactElement => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    props.fetchMovies({
      loadingMoviesState: props.loadingMoviesState,
      movies: props.movies
    });
    
    let resizedFinished: NodeJS.Timeout;
    window.addEventListener('resize', (event) => {
      clearTimeout(resizedFinished);
      resizedFinished = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 300);
    }, true);
    return () => { window.removeEventListener('resize', () => {})};
  }, []);

  return (
    <div className='wookie-app__browse-movies-wrapper'>
      { 
        (showLoadingSpinner(props.loadingMoviesState)) &&
        <LoadingSpinner loading={props.loadingMoviesState === LoadingState.loading} 
                      failed={props.loadingMoviesState === LoadingState.failed} 
                      loadingMessage='Loading movies'
                      failedMessage='Failed to load movies. Please refresh the page to try again.'/>
      }
    
      {
        (props.loadingMoviesState === LoadingState.completed) &&
        props.movies.map((movie: GroupedMovies, index: number) => {
          return (
            <div key={index} className="wookie-app__browse-movies-genre">
              <h1> { movie.genre } </h1>
              {<Scroller movies={movie.movies} width={width}/>}
            </div>
          )
        })
      }
    </div>
  );
  
}
const mapStateToProps: any = (state: any): BrowseState => {
  const {
    movies,
    loadingMoviesState
  }: BrowseState = state.movieHandling;

  return {
    movies,
    loadingMoviesState
  }
}

const mapDispatchToProps: any = (dispatch: ThunkDispatch<BrowseState, any, ActionBrowse>) => {
  return {
    fetchMovies: (state: BrowseState) => {
      return dispatch(fetchMovies(state));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseMovies);
