"use client";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

export default function CreateMoviePage() {
  const [movieTitle, setMovieTitle] = useState("");

  function createMovie() {
    axiosInstance.post("movies", { title: movieTitle }).then((response) => {
      console.log(response.data);
      setMovieTitle("");
    });
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-[#E0E0E0] p-4 rounded-lg shadow-lg ">
        <div className="font-bold flex justify-center mb-10">
          Create a new movie
        </div>
        <input
          type="text"
          placeholder="Title"
          className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createMovie();
            }
          }}
        />
        <button
          onClick={createMovie}
          className="bg-[#008080] text-black font-bold py-2 px-4 rounded mt-4">
          Create
        </button>
      </div>
    </div>
  );
}
