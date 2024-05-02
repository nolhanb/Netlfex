import React,{useState} from "react";
import { SearchResultsList, SuggestedMovie } from "./SearchResultsList";

 export const BarreDeRecherche = ({setResults}) => {
    const [suggestedmovie, setSuggestedMovie] = useState([]);
    const [input , setInput] = useState('')

    const handleChange = (value) => {
        let movieArray = []
        setInput(value)
        const apiCall = fetch(`https://api.themoviedb.org/3/search/movie?api_key=3e1cbd9932ebd9dd61ff0a6d60211440&language=en-US&query=${value}&page=1&include_adult=false`).then((response) => response.json()).then((apiCall)=>{
            for (const obj in apiCall) {
                const resultapi = apiCall[obj]
                for ( const i in resultapi) {
                    const movieResults = (resultapi[i])
                    movieArray.push(movieResults)
                }
            }
            movieArray.sort();
            setSuggestedMovie(movieArray)
        })
    }
    return (
        <div className="searchbar">
            <input type="text" placeholder="Search a Movie"
                value={input} onChange={( e ) => 
                handleChange(e.target.value)}>
            </input>
            <SearchResultsList movies={suggestedmovie}/> 
        </div>
    )
};
