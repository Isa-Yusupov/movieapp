import React, { useState, useEffect } from "react";
import debounce from 'lodash.debounce'
import MovieList from "../movie-list";
import {Input, Menu, Pagination, Spin} from "antd";


import './App.css';

const items = [
  {
    label: 'Search',
    key: 'search',
  },
  {
    label: 'Rated',
    key: 'rated',
  },
];


const App = () => {

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isRated, setIsRated] = useState(false);
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);


  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&page=${page}&api_key=c9f19a283b047501123a2b40b58eac88`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  };

  const getGenre = async () => {
    const urlGenre = 'https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=c9f19a283b047501123a2b40b58eac88'
    const response = await fetch(urlGenre);
    const responseJson = await response.json();
    return responseJson;
  }

  useEffect(() => {
    (async () => {
      const res = await getMovieRequest(searchValue);
      setMovies(res.results);
    })()
  }, [searchValue, page, genre]);

  const movieFavourites = JSON.parse(localStorage.getItem('react-movie-fav'));

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-fav', JSON.stringify(items))
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(Array.from(new Set(newFavouriteList)));
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  };

  const editRated = ({item, key}) => {
    if (key === 'rated') {
      setIsRated(true)
    } else if (key === 'search') {
      setIsRated(false)
    }
  }

  return (
    <div className='container'>
      <Menu onClick={editRated} className='menu' mode="horizontal" items={items}/>
      {!isRated && (
        <>
          <Input onKeyUp={debounce(handleChange, 1000)} placeholder="Type to search..." rootClassName='input'/>
          <div className='container-movies'>
            <MovieList genre={genre} movies={movies} handleFavouritesClick={addFavouriteMovie}/>
          </div>
          <Pagination className='pagination-container' onChange={(page) => setPage(page)} total={movies.length} />
        </>
      )}
      {isRated && (
        <div className='container-movies'>
          <MovieList movies={movieFavourites}/>
        </div>
      )}
    </div>
  );
}

export default App;
