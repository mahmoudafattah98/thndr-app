import { useEffect, useState } from "react";
import { Spin, Carousel, Card } from "antd";
import { waitForDebugger } from "inspector";
const { Meta } = Card;
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Movies() {
  const [info, setInfo]: [info, any] = useState({
    Search: [],
    totalResults: 0,
    Response: "",
  });
  const [loading, setLoading]: [boolean, any] = useState(false);

  async function getMovies() {
    setLoading(true);
    const response = await fetch(
      "https://www.omdbapi.com/?apikey=8bdf708a&s=hangover"
    );
    const data = await response.json();
    setInfo(data);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    getMovies();
  }, []);

  type movieType = "movie" | "series" | "episode";
  type info = {
    Search: Array<movie>;
    totalResults: number;
    Response: String;
  };
  type movie = {
    Title: string;
    Year: number;
    imdbId: string;
    Type: movieType;
    Poster: string;
  };

  function renderMovies() {
    return info.Search.map((movie: movie, index: number) => {
      return (
        // <div key={index}>
        // <h3>{movie.Title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {movie.Year}</h3>
        // <img src={movie.Poster} alt={movie.Title} /><br />
        // <p>{movie.Type}</p>
        // <br />
        //     </div>
        <>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={movie.Poster} />}
          >
            <Meta title={movie.Title} description={movie.Year} />
          </Card>
        </>
      );
    });
  }

  function renderCarousel() {
    return <></>;
  }

  return <>{loading ? <Spin /> : renderMovies()}</>;
}
