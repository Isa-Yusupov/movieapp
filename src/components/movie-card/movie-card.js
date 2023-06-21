import React from "react";
import {Rate, Image} from "antd";
import posterError from "../../posterError.jpg"
import './movie-card.css'
import {format, parseISO} from 'date-fns'

const posterPath = 'https://image.tmdb.org/t/p/original'

function kitcut(text, limit) {
    const re = new RegExp("(^.{" + (limit - 1) + "}([^ ]+|\\s))(.*)");
    const result = text.replace(re, "$1");
    return `${result}...`;
}

const MovieCard = ({ movies, handleFavouritesClick, genre }) => {


    return (
        <>
          {movies?.map((movie) => (
              <div className='card' key={movie.id}>
                <Image src={movie.poster_path? posterPath + movie.poster_path : posterError} alt="movie" width={183} height={281}/>
                <div className='card-info-container'>
                    <div className='card-title'>
                        <h3>{movie.title}</h3>
                        <div className='vote-average'><span>{movie.vote_average.toFixed(1)}</span></div>
                    </div>
                    <span>{movie.release_date && (format(parseISO(movie.release_date), 'MMMM d, yyyy'))}</span>
                    <span className='overview'>{kitcut(movie.overview, 150)}</span>
                    <Rate rootClassName='rate' onClick={() => handleFavouritesClick(movie)} allowHalf count={10}/>
                </div>
              </div>
          ))}
        </>
        )
}


export default MovieCard;