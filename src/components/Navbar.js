import React from 'react';
import { connect } from 'react-redux';
// import { connect} from '..';
// import {data} from '../data';
import {addMovieToList, handleMovieSearch} from '../actions';


class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      
      searchText: ''
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
    // this.setState({
    //   showSearchResults: false
    // });
  }

  handleSearch = () => {
      const { searchText } = this.state;
      this.props.dispatch(handleMovieSearch(searchText));
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  render() {
    // const {showSearchResults} = this.state;
    const { result, showSearchResults } = this.props.search;
    return (
        <div className="nav">
          <div className="search-container">
              <input onChange={this.handleChange}/>
              <button id="search-btn" onClick={this.handleSearch}>Search</button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={result.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{result.Title}</span>
                  <button
                    onClick={() => this.handleAddToMovies(result)}
                  >
                    Add to Movies
                  </button>
                </div>
              </div>
              {/* {data.length > 1 && (
                <div className="search-result">
                  <img src={data[1].Poster} alt="search-result-pic" />

                  <div className="movie-info">
                    <span>{data[1].Title}</span>
                    <button
                      onClick={() => this.handleAddToMovies(data[1])}
                    >
                      Add to Movies
                    </button>
                  </div>
                </div>
              )} */}
              {/* {data.length > 2 && (
                <div className="search-result">
                  <img src={data[2].Poster} alt="search-result-pic" />

                  <div className="movie-info">
                    <span>{data[2].Title}</span>
                    <button
                      onClick={() => this.handleAddToMovies(data[2])}
                    >
                      Add to Movies
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          )}
          </div>
        </div>
      );
  }
  
}

// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <Navbar dispatch={store.dispatch} search={this.props.search}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps ({search}) {
  return{
    // search: state.search
    search,
  }
}

export default connect(mapStateToProps)(Navbar);



/* 


import React from "react";
import { StoreContext } from "..";

import { handleMovieSearch, handleAddMovieToList } from "../actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }
  handleAddToMovies = (movie) => {
    this.props.dispatch(handleAddMovieToList(movie.imdbID));
    this.setState({
      showSearchResults: false,
    });
  };
  handleChange = (e) => {
    function callback() {
      if (this.state.searchText !== "") {
        const { searchText } = this.state;
        console.log("state search text => ", searchText);
        this.props.dispatch(handleMovieSearch(searchText));
      }
    }
    this.setState(
      {
        searchText: e.target.value,
      },
      callback
    );
  };
  handleSearch = () => {
    if (this.state.searchText !== "") {
      const { searchText } = this.state;
      this.props.dispatch(handleMovieSearch(searchText));
    }
    return;
  };
  render() {
    const { showSearchResults } = this.props.search;
    const { result } = this.props.search;
    const searchText = this.state.searchText !== "" ? true : false;
    console.log("SEarch text =>", this.state.searchText);
    console.log("NAVBAR render result=> ", result);
    return (
      <div className="navbar">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && result.Response === "False" && searchText && (
            <div className="search-results not">{result.Error}</div>
          )}
          {showSearchResults && result.Response === "True" && (
            <div className="search-results">
              <div className="search-result">
                <img src={result.Search[0].Poster} alt="search-result-pic" />

                <div className="movie-info">
                  <span>{result.Search[0].Title}</span>
                  <button
                    onClick={() => this.handleAddToMovies(result.Search[0])}
                  >
                    Add to Movies
                  </button>
                </div>
              </div>
              {result.Search.length > 1 && (
                <div className="search-result">
                  <img src={result.Search[1].Poster} alt="search-result-pic" />

                  <div className="movie-info">
                    <span>{result.Search[1].Title}</span>
                    <button
                      onClick={() => this.handleAddToMovies(result.Search[1])}
                    >
                      Add to Movies
                    </button>
                  </div>
                </div>
              )}
              {result.Search.length > 2 && (
                <div className="search-result">
                  <img src={result.Search[2].Poster} alt="search-result-pic" />

                  <div className="movie-info">
                    <span>{result.Search[2].Title}</span>
                    <button
                      onClick={() => this.handleAddToMovies(result.Search[2])}
                    >
                      Add to Movies
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

class NavbarWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => (
          <Navbar dispatch={store.dispatch} search={this.props.search} />
        )}
      </StoreContext.Consumer>
    );
  }
}
export default NavbarWrapper;

*/ 