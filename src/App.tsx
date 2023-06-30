import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import './App.scss';
import BrowseMovies from './browse-movies/browse-movies.component';
import SearchMovies from './search-movies/search-movies.component';
import Header from './header/header.component';
import MovieDetail from './movie-detail/movie-detail.component';
import { ReactElement } from 'react';

const App = (): ReactElement => {
  return (
    <div>
      <Router>
        <div className="wookie-app__page-wrapper">
          <div className="wookie-app__page-spacer">
            <Header/>
            <main>
              <Routes>
                <Route path="/" element={<Navigate to="/browse" />}/>
                <Route path="/browse" element={<BrowseMovies/>} />
                <Route path="/search" element={<SearchMovies/>} />
                <Route path="/movie/:slug" element={<MovieDetail/>} />
                <Route path="*" element={<Navigate to="/browse" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;