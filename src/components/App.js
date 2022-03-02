import React from 'react'; 
import { data as moviesList } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites} from '../actions';
import {connect} from '../index';

class App extends React.Component {
  componentDidMount () {
    // const { store } = this.props;
    // store.subscribe(() => {
    //   console.log('UPDATED');
    //   this.forceUpdate();
    //})
    // this.props.store.subscribe(() => this.forceUpdate());
    this.props.dispatch(addMovies(moviesList));
    
    //make api call
    // dispatch action
    /*store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });*/
    // store.dispatch(addMovies(data));
    // console.log('State', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    // const {movies} = this.props.store.getState();
    const {movies} = this.props;

    const index = movies.favourites.indexOf(movie);
    //console.log("index = ", index);

    if(index !== -1)
    {
      //found the movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    //const {list, favourites, showFavourites} = this.props.store.getState();  //{list:[] , favourites:[]}
    const {movies, search} = this.props;       //{movies: {} , search: {}}
    console.log('movies', movies);
    const {list, favourites=[] , showFavourites=[]} = movies;
    //console.log('RENDER', this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    //return (
      // <StoreContext.Consumer>
      //   {(store) => {
          
           return (
            <div className="App">
              <Navbar /*dispatch={this.props.store.dispatch}*/ search={search} />
              <div className="main">
                <div className="tabs">
                  <div className={`tab ${showFavourites?'': 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
                  <div className={`tab ${showFavourites?'active-tabs': ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
                </div>
                <div id="list"> 
                  {displayMovies.map((movie/*, index*/) => (
                    <MovieCard 
                      movie={movie}
                      //key={`movies-${index}`}
                      key={movie.imdbID}
                      dispatch={this.props.dispatch}
                      isFavourite = {this.isMovieFavourite(movie)}
                    />
                  ))}
                
                {displayMovies.length === 0 ? (<div className="no-movies">No movies to display!</div>) : null }
                </div>
              </div>
            </div>
           );
        }
        //}
      // </StoreContext.Consumer>
    //)
    
  // }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps (state) {
  return {
    movies: state.movies,
    search: state.movies
  };
}
const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
