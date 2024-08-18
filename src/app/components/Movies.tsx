import { useEffect, useState } from "react";
import { Spin, Carousel, Card } from "antd";
import { waitForDebugger } from "inspector";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, Empty } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const { Meta } = Card;
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const DEFAULT_STATE = {
  Search: [],
  totalResults: 0,
  Response: "",
};

export default function Movies() {
  const [info, setInfo]: [info, any] = useState({
    Search: [],
    totalResults: 0,
    Response: "",
  });
  const [loading, setLoading]: [boolean, any] = useState(false);
  const [search, setSearch] = useState("");

  async function getMovies(searchKey: string) {
    setLoading(true);
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=8bdf708a&s=${searchKey}` // this is called a string literal
    );
    const data = await response.json();
    setInfo(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

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

  function renderMovies(empty?: boolean) {
    if (info.Response === "False" || empty) {
      return <Empty />;
    } else {
      return info.Search.map((movie: movie, index: number) => {
        return (
          <>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={movie.Poster} />}
            >
              <Meta title={movie.Title} description={movie.Year} />
            </Card>
            <br />
          </>
        );
      });
    }
  }

  function onSearch(value: string) {
    if (value == "") {
      renderMovies(true);
    }
    getMovies(value);
  }

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
      />
      <br />
      {loading ? <Spin /> : renderMovies()}
    </>
  );
}
