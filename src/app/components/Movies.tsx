import { useEffect, useState } from "react"
import { Spin } from "antd";
import { waitForDebugger } from "inspector";
import { Card } from "antd";

export default function Movies() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false); 


    async function getMovies() {
        setLoading(true);
        const response = await fetch("https://www.omdbapi.com/?apikey=8bdf708a&s=hangover");
        const data = await response.json();
        setMovies(data.Search);
        setTimeout(() => {
            setLoading(false);
        },3000)
    }

    useEffect(() => {
        getMovies();
    }, [])


    
    type movieType = "movie" | "series" | "episode"

    type movie = {
        Title:string,
        Year: number,
        imdbId: string,
        Type: movieType,
        Poster: string
    }

    function renderMovies() {
        return movies.map((movie: movie, index: number) => {
            return(
            <div key={index}>
            <h3>{movie.Title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.Year}</h3>
            <img src={movie.Poster} alt={movie.Title} /><br />
            <p>{movie.Type}</p>
            <br />
                </div>
            )
        })
     }

    return (<>
       { loading ?<Spin />  :
        renderMovies()}
    </>)
 } 