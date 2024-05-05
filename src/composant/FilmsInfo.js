import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ShowDate from "./Date";
import { Link } from "react-router-dom";
import getGenres from "./Gender";


function Infos({ page, genres }) {
  const [popularMovies, setPopularMovies] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState({});
  const [videoUrls, setVideoUrls] = useState({});
  const [count, setCount] = useState(1);

  function handleMouseOver(movieId) {
    setHoveredMovie((prevState) => ({ ...prevState, [movieId]: true }));
  }
  function handleMouseOut(movieId) {
    setHoveredMovie((prevState) => ({ ...prevState, [movieId]: false }));
  }

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=197f45d53d5b992d518f4d9e5c9b0f43&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genres}`;
  
  const getData = async (url) => {
    const rawData = await fetch(url);
    const jsonData = await rawData.json();
    setPopularMovies(jsonData);
    
    const videoUrlsMap = {};
    for (const movie of jsonData.results) {
      const videoData = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=197f45d53d5b992d518f4d9e5c9b0f43&language=en-US`);
      const videoJsonData = await videoData.json();
      if (videoJsonData.results.length > 0) {
        const key = movie.id;
        videoUrlsMap[key] = `https://www.youtube.com/watch?v=${videoJsonData.results[0].key}`;
      }
    }
    setVideoUrls(videoUrlsMap);
  };
  
  useEffect(() => {
    getData(url);
  }, [page, genres]);

  const popularMoviesArray = popularMovies.results;

  return (
    <div className="catalogue">
      {popularMoviesArray?.map((movie) => (
        <div
          className="movie"
          onMouseOver={() => handleMouseOver(movie.id)}
          onMouseOut={() => handleMouseOut(movie.id)}
        >
          {hoveredMovie[movie.id] && (
            <Modal
              img={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
              title={movie.title}
              resume={movie.overview}
              genre={getGenres(movie).join(" - ")}
              videoUrl={videoUrls[movie.id]}
            />
          )}
          <Link to={"/" + movie.id}>
            <img
              className="backdrop-img"
              src={"https://image.tmdb.org/t/p/w200" + movie.backdrop_path}
            ></img>
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <span className="movie-date">
                <ShowDate date={movie.release_date} />
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Infos;
