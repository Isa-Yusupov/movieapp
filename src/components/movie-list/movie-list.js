import React from "react";
import MovieCard from "../movie-card";

import './movie-list.css'



const MovieList = ({movies, handleFavouritesClick, genre}) => {
  return <>
    <MovieCard genre={genre} movies={movies} handleFavouritesClick={handleFavouritesClick}/>
  </>
};


export default MovieList;