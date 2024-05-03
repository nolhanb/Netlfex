import Header from "../composant/Header";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../style/FilmsDetails.css";
import getGenres from "../composant/Gender";
import ShowDate from "../composant/Date";
import { SearchResultsList } from "../composant/SearchResultsList";

function Détails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}
    ?api_key=197f45d53d5b992d518f4d9e5c9b0f43`)
      .then((response) => response.json())
      .then(setMovie);
  }, [id]);

  const [similarMovies, setSimilarMovies] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=197f45d53d5b992d518f4d9e5c9b0f43&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then(setSimilarMovies);
  }, [id]);

  const similarMoviesArray = similarMovies?.results;

  const title = movie?.title;
  const original_title = movie?.original_title;
  const note = movie?.vote_average;
  const date = movie?.release_date;
  const resume = movie?.overview;
  const img = "https://image.tmdb.org/t/p/w200" + movie?.poster_path;
  const language = movie?.original_language;

  const genre = movie?.genres
  const ID = movie?.id
 
  const Genress = []
  for (const i in genre) {
    Genress.push(genre[i].name)
    Genress.join(" ")

  }

  return (
    <div>
      <Header />

      <div className="details">
        <div className="upper-block">
          <div className="wrapper">
            <div className="middle">
              <img className="img-film" src={img}></img>

              <div className="title-ul">
                <h1> {title} </h1>
                <div className="lil">
                  <span className="date">
                    <ShowDate date={date}></ShowDate>
                  </span>
                  <span className="facts">{note}</span>
                  {movie?.vote_count} votes
                </div>
                <span className="resume">Synopsis </span>
                <p> {resume}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <ul>
            <li>
              <span className="bold-style">Original Title : </span>{" "}
              {original_title}{" "}
            </li>
            <li>
              <span className="bold-style">Gender : </span> {Genress.join(" - ")}{" "}
            </li>
            <li>
              <span className="bold-style">Release date : </span>{" "}
              <ShowDate date={date}></ShowDate>{" "}
            </li>
            <li>
              <span className="bold-style">Original language : </span>{" "}
              {language}{" "}
            </li>
            <li>
              <span className="bold-style">Runtime : </span> {movie?.runtime}{" "}
              min
            </li>
            <li>
              <span className="bold-style">Budget : </span> {movie?.budget}
            </li>
          </ul>
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <h2 className="underlined">Similar movies</h2>
          <section className="slider">
            <div className="slider-container">
              <SearchResultsList Filmbdr={ID}/>
              {similarMoviesArray
                ?.filter((movie) => movie.poster_path !== null)
                .map((movie) => (
                  <Link to={"/" + movie.id}>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w200" + movie.poster_path
                      }
                    ></img>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Détails;
