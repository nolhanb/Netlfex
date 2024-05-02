import React,{ useState } from "react";
import "../style/SearchResultsList.css";
import { Link } from "react-router-dom";

export const SearchResultsList = ( { movies } ) => {
  
  return (
    <div className="results-list">
      {movies?.map((movie) => 
      <Link to={"/" + movie.id}> <p>{movie.title}</p></Link>)}
    </div>
  )
}
