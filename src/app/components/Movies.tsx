import React, { useState, useEffect } from "react";
import { Spin, Card, Input, Empty } from "antd";
import { useInfiniteQuery } from "@tanstack/react-query";

const { Search } = Input;
const { Meta } = Card;

type movieType = "movie" | "series" | "episode";
type movie = {
  Title: string;
  Year: number;
  imdbId: string;
  Type: movieType;
  Poster: string;
};

async function fetchMovies({ queryKey, pageParam = 1 }: any) {
  const searchTerm = queryKey[0];
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=8bdf708a&s=${searchTerm}&page=${pageParam}`
  );
  const data = await response.json();
  return { ...data, page: pageParam };
}

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`${searchTerm}`],
      queryFn: fetchMovies,
      getNextPageParam: (lastPage) => {
        const totalResults = parseInt(lastPage.totalResults);
        const maxPages = Math.ceil(totalResults / 10);
        if (lastPage.page < maxPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      enabled: !!searchTerm,
    });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  function renderMovies() {
    if (!data?.pages.length || data.pages[0]?.Response === "False") {
      return <Empty />;
    } else {
      return data.pages.flatMap((page) =>
        page.Search.map((movie: movie) => (
          <Card
            key={movie.imdbId}
            hoverable
            style={{ width: 240, marginBottom: "20px" }}
            cover={<img alt={movie.Title} src={movie.Poster} />}
          >
            <Meta title={movie.Title} description={movie.Year} />
          </Card>
        ))
      );
    }
  }

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton
        size="large"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <div>{isLoading ? <Spin /> : renderMovies()}</div>
      {isFetchingNextPage && <Spin style={{ marginTop: 20 }} />}
    </>
  );
}
