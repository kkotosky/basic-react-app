import React, { MutableRefObject, ReactElement } from 'react';
import TitleCard from '../../title-card/title-card.component';
import { Fab } from '@material-ui/core';
import { FastForward, FastRewind } from '@mui/icons-material';
import { Movie } from '../../types';
import { PAGE_BREAKPOINTS } from '../../globals';
import './scroller.component.scss';

interface ShowMovie extends Movie {
  index: number;
}

const getNumberOfShowingMovies = (windowSize: number): number => {
  if (windowSize < PAGE_BREAKPOINTS.small) {
    return 2;
  } else if (windowSize < PAGE_BREAKPOINTS.medium) {
    return 3;
  } else if (windowSize < PAGE_BREAKPOINTS.large) {
    return 4;
  } else if (windowSize < PAGE_BREAKPOINTS.xlarge) {
    return 5;
  } else {
    return 6
  }
}

const getNextMovies = (movies: ShowMovie[], numberOfNextMovies: number, lastVisible: number): ShowMovie[] => {
  const newMovies: ShowMovie[] = [];
  const numberOfMovies: number = movies.length;
  for (let i = 0; i < numberOfNextMovies; i++) {
    const checkIndex: number = lastVisible + i; 
    if (checkIndex < numberOfMovies) {
      newMovies.push(movies[checkIndex]);
    } else {
      newMovies.push(movies[checkIndex - numberOfMovies]);
    }
  }
  return newMovies;
}

const getPreviousMovies = (movies: ShowMovie[], numberOfShowingMovies: number, firstVisible: number): ShowMovie[] => {
  const newMovies: ShowMovie[] = [];
  const numberOfMovies: number = movies.length;
  for (let i = 1; i <= numberOfShowingMovies; i++) {
    const checkIndex: number = firstVisible - i;  
    if (checkIndex > 0) {
      newMovies.unshift(movies[checkIndex - 1]);
    } else if (checkIndex === 0) {
      newMovies.unshift(movies[movies.length - 1]);
    } else {
      newMovies.unshift(movies[checkIndex + (numberOfMovies - 1)]);
    }
  }
  return newMovies;
}

const Scroller = ({ movies, width }: {movies: Movie[]; width: number}): ReactElement  => {    
  let numberOfShowingMovies: MutableRefObject<number> = 
    React.useRef(getNumberOfShowingMovies(width));
  let lastVisible: MutableRefObject<number> = 
    React.useRef(movies.length < numberOfShowingMovies.current ? movies.length : numberOfShowingMovies.current);
  let firstVisible: MutableRefObject<number> = React.useRef(1);  
  
  const showMovies: ShowMovie[] = movies.map((movie: Movie, index: number) => {
    return {
      ...movie,
      index: index + 1
    }
  });

  const [showingMovies, setShowingMovies] = 
    React.useState<ShowMovie[]>(showMovies.slice(0, numberOfShowingMovies.current));
  
  const [isDisabled, setIsDisabled] = 
    React.useState<boolean>(movies.length <= numberOfShowingMovies.current);

  const [moving, setIsMoving] = 
    React.useState<boolean>(false)

  const [leftValue, setLeftValue] = 
    React.useState<number>(0);

  const doWindowSizeUpdate = (): void => {
    const tmpLastNumOfShowingMovies = numberOfShowingMovies.current;
    numberOfShowingMovies.current = getNumberOfShowingMovies(window.innerWidth);
    const change = (numberOfShowingMovies.current - tmpLastNumOfShowingMovies);
    if (change > 0) {
      let nextMovies: ShowMovie[];
      if (movies.length >= numberOfShowingMovies.current) {
        nextMovies = getNextMovies(showMovies, change, lastVisible.current);
        if (nextMovies.length) {
          lastVisible.current = nextMovies[nextMovies.length - 1].index;
        }
      } else {
        nextMovies = getNextMovies(showMovies, (movies.length - tmpLastNumOfShowingMovies), lastVisible.current);
        if (nextMovies.length) {
          lastVisible.current = nextMovies[nextMovies.length - 1].index;
        }
      }

      setShowingMovies(showingMovies.concat(nextMovies));
    } else if (change < 0) {
      const tmp = showingMovies.slice(0, numberOfShowingMovies.current);
      setShowingMovies(tmp);
      lastVisible.current = tmp[tmp.length - 1].index;
    }
    setIsDisabled(movies.length <= numberOfShowingMovies.current);
  }

  React.useEffect(() => {
    doWindowSizeUpdate();
  }, [width]);
  
  const moveBackward = (): void => {
    const backMovies: ShowMovie[] = getPreviousMovies(showMovies, numberOfShowingMovies.current, firstVisible.current);
    lastVisible.current =  backMovies[backMovies.length - 1].index;
    firstVisible.current = backMovies[0].index;
    
    setShowingMovies(backMovies.concat(showingMovies));
    setLeftValue(-100);

    setTimeout(() => {
      setIsMoving(true);
      setLeftValue(0);
    });
    setTimeout(() => {
      setIsMoving(false);
      setShowingMovies(backMovies);
    }, 1000);
  };

  const moveForward = (): void => {
    const nextMovies: ShowMovie[] = getNextMovies(showMovies, numberOfShowingMovies.current, lastVisible.current);
    lastVisible.current =  nextMovies[nextMovies.length - 1].index;
    firstVisible.current = nextMovies[0].index;

    setShowingMovies(showingMovies.concat(nextMovies));
    setIsMoving(true);
    setLeftValue(-100);
    
    setTimeout(() => {
      setIsMoving(false);
      setShowingMovies(nextMovies);
      setLeftValue(0);
    }, 1000)
  };

  return (
    <div className="button-wrappers">
      <Fab color="default" aria-label="upload picture" className="backwardsButton" size="small" disabled={isDisabled} onClick={moveBackward}>
        <FastRewind />
      </Fab>
      <div className="wookie-app__browse-movies-hidden">
        <div className={"scroller " + (moving ? 'moving' : '')} style={{left: `${leftValue}%` }}>
          {
            showingMovies.map((movie: Movie, index: number) => {
              return (
                <TitleCard key={index} movie={movie}></TitleCard>
              )
            })
          }
        </div>
      </div>
      <Fab color="default" aria-label="upload picture" className="forwardsButton" size="small"  disabled={isDisabled} onClick={moveForward}>
        <FastForward />
      </Fab>
    </div>
  );
  
}

export default Scroller;
