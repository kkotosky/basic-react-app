import { Movie } from '../types';
import { ReactElement } from 'react';
import './title-card.component.scss';

const TitleCard = ({ movie }: {
  movie: Movie
}): ReactElement => {

  const goToDetail = () => {
    window.location.href = `/movie/${movie.slug}`;
  };

  return (
    <div onClick={() => {goToDetail()}} className="wookie-app__selectable-movie">
      <img src={movie.backdrop} alt={movie.title}/>
    </div>
  )
};

export default TitleCard;
