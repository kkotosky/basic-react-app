import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import './App.scss';
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
                <Route path="/" element={<Navigate to="/movie/the-dark-knight-2008" />}/>
                <Route path="/movie/:slug" element={<MovieDetail/>} />
                <Route path="*" element={<Navigate to="/move/the-dark-knight-2008" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;