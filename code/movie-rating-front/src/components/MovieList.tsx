"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosInstance.get("movies").then((response) => {
      setMovies(response.data);
    });
  }, []);
  // const movies = [
  //   {
  //     id: 1,
  //     title: "Mulholland Drive",
  //     comments_count: 12,
  //     rating: 4.5,
  //     ratings_count: 23,
  //   },
  //   {
  //     id: 2,
  //     title: "Eternal Sunshine of the Spotless Mind",
  //     comments_count: 10,
  //     rating: 4.3,
  //     ratings_count: 10,
  //   },
  //   {
  //     id: 3,
  //     title: "Bitter Moon ",
  //     comments_count: 1,
  //     rating: 3.8,
  //     ratings_count: 13,
  //   },
  //   {
  //     id: 4,
  //     title: "Bitter Moon ",
  //     comments_count: 1,
  //     rating: 3.8,
  //     ratings_count: 13,
  //   },
  // ];

  return (
    <div className="m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <MovieCard
            key={movie.id}
            title={movie.title}
            comments_count={movie.comments_count}
            rating={movie.rating}
            ratings_count={movie.ratings_count}
          />
        </Link>
      ))}
    </div>
  );
}
