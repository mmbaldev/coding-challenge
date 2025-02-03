"use client";
import MovieList from "@/components/MovieList";
import SearchedList from "@/components/SearchedList";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useState } from "react";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  function searchMovie() {
    if (!keyword) {
      return;
    }
    axiosInstance(`/movies/search?keyword=${keyword}`).then((response) => {
      setSearchResults(response.data);
    });
  }
  return (
    <>
      <div className="flex justify-between items-center m-8">
        <Link href="/movies/create">
          <button className="bg-[#00FFC2] text-black font-bold py-2 px-4 rounded">
            Create New Movie
          </button>
        </Link>
        <input
          type="text"
          placeholder="Search for a movie..."
          className="flex-grow mx-4 p-2 border border-gray-300 rounded"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={searchMovie}
          className="bg-[#FFD700] text-black font-bold py-2 px-4 rounded">
          Search
        </button>
      </div>
      {searchResults.length > 0 ? (
        <SearchedList movies={searchResults} />
      ) : (
        <MovieList />
      )}
    </>
  );
}
