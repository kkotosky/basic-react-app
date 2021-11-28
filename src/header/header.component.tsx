import SearchIcon from '@mui/icons-material/Search';
import TextField from '@material-ui/core/TextField';
import React, { ReactElement } from 'react';
import { SearchMoviesState } from '../search-movies/reducers';
import { SearchAction, setSearchState } from '../search-movies/actions';
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './header.component.scss';

let doSearch: NodeJS.Timeout;
const Header = (props: any): ReactElement => {  

  const [searchTerm, setSearchTerm] = React.useState<string>(props.searchTerm);
  const history = useNavigate();

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  
  const onSearchChange = (searchTerm: string) => {
    clearTimeout(doSearch);
    doSearch = setTimeout(() => {
      props.setSearchState(props, searchTerm);
      history(`/search?searchTerm=${searchTerm}`)
    }, 500);
  }

  React.useEffect(() => {
    if (query.get('searchTerm') && !props.searchTerm) {
      props.setSearchState(props, query.get('searchTerm'));
    }
    setSearchTerm(props.searchTerm);
  }, [props.searchTerm]);

  return (
    <div className="wookie-app_header">
      <h1> Wookie Movies </h1>  
      <div>
        <SearchIcon/>
        <TextField  
          id='search'
          name='search'
          label='Search...'
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val.currentTarget.value);
            onSearchChange(val.currentTarget.value)
          }}/>
      </div>
    </div>
  )
};

const mapStateToProps: any = (state: any): SearchMoviesState => {
  const {
    searchTerm
  }: SearchMoviesState = state.searchMovieHandling;

  return {
    searchTerm
  };
}

const mapDispatchToProps: any = (dispatch: Dispatch<SearchAction>) => {
  return {
    setSearchState: (state: SearchMoviesState, searchTerm: string) => {
      return dispatch(setSearchState(state, searchTerm));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
