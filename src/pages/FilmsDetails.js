import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../composant/Header";
import "../style/FilmsDetails.css";
import ShowDate from "../composant/Date";
import { SearchResultsList } from "../composant/SearchResultsList";
import Youtube from 'react-youtube';

function Détails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=197f45d53d5b992d518f4d9e5c9b0f43`)
      .then((response) => response.json())
      .then(setMovie);

    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=197f45d53d5b992d518f4d9e5c9b0f43&language=en-US&page=1`)
      .then((response) => response.json())
      .then(setSimilarMovies);

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=197f45d53d5b992d518f4d9e5c9b0f43`)
      .then((response) => response.json())
      .then((data) => {
        const trailer = data.results.find(vid => vid.type === "Trailer");
        setTrailer(trailer);
      });
  }, [id]);

  const similarMoviesArray = similarMovies?.results;
 

  const getGenres = (genres) => {
    if (!genres || !Array.isArray(genres)) {
      return [];
    }
    return genres.map(genre => genre.name);
  };

  return (
    <div>
      {movie && (
        <div className="details">
          <div className="upper-block">
            <div className="wrapper">
              <div className="middle">
                <img className="img-film" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            
                <div className="title-ul">
                  <h1>{movie.title}</h1>
                  <div className="lil">
                    <span className="date">
                      <ShowDate date={movie.release_date} />
                    </span>
                    <span className="facts">{movie.vote_average}</span>
                    {movie.vote_count} votes
                  </div>
                  <span className="resume">Synopsis </span>
                  <p>{movie.overview}</p>
                  
                </div>
                <ul className="okok">
              <li>
                <p className="bold-style">Original Title : </p>{" "}
                {movie.original_title}
              </li>
              <li>
                <p className="bold-style">Gender : </p> {getGenres(movie.genres).join(" - ")}
              </li>
              <li>
                <p className="bold-style">Release date : </p>{" "}
                <ShowDate date={movie.release_date} />
              </li>
              <li>
                <p className="bold-style">Original Version : </p>{" "}
                {movie.original_language}
              </li>
              <li>
                <p className="bold-style">Runtime : </p> {movie.runtime} min
              </li>
              <li>
                <p className="bold-style">Budget : </p> {movie.budget}
              </li>
            </ul>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="liste"> 
          </div>
        </div>
        </div>
      )}
      <div className="Video">
      <Header />
      {trailer && (
        <Youtube
          videoId={trailer.key}
          className={"youtube"}
          containerClassName={"youtube-container"}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 0,
              controls: 1,
            },
          }}
        />
      )}
      </div>

      {similarMoviesArray && similarMoviesArray.length > 0 && (
        <div className="content">
          <div className="wrapper">
            <h2 className="underlined">Similar movies</h2>
            <section className="slider">
              <div className="slider-container">
                <SearchResultsList Filmbdr={id} />
                {similarMoviesArray.map((movie) => (
                  <Link to={"/" + movie.id} key={movie.id}>
                    <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Détails;
