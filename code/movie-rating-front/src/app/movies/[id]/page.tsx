"use client";
import { MdDelete, MdMovie } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Rating } from "@/components/Rating";

interface Movie {
  id: number;
  title: string;
  rating: number;
  ratings_count: number;
  comments_count: number;
  comments: [];
}

export default function MoviePage() {
  const router = useRouter();
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  function fetchMovie() {
    axiosInstance
      .get(`movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setLoading(false);
      });
  }
  function deleteMovie() {
    axiosInstance.delete(`movies/${id}`).then((response) => {
      router.push("/");
    });
  }

  function addComment() {
    axiosInstance
      .post(`movies/${id}/comment`, { content: newComment })
      .then((response) => {
        setNewComment("");
        fetchMovie();
      });
  }

  function addNewRating() {
    if (newRating === 0) return;
    axiosInstance
      .post(`movies/${id}/rate`, { stars: newRating })
      .then((response) => {
        setNewRating(0);
        fetchMovie();
      });
  }

  return (
    <div className="flex flex-col justify-center text-center m-4">
      <div className="flex flex-col w-full md:w-1/3 m-2 bg-[#E0E0E0] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer space-y-4 place-self-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MdMovie className="text-4xl text-black mr-4" />
            <h2 className="font-bold ">{movie.title}</h2>
          </div>
          <MdDelete
            onClick={deleteMovie}
            className="text-2xl text-[#DC143C] mr-4"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center content-center">
            <FaStar className="text-2xl text-yellow-700 mr-2 " />
            <div className="font-bold ">
              {movie.rating !== null && movie.rating !== undefined ? (
                <>
                  {parseFloat(movie.rating).toFixed(2)}{" "}
                  <span className="font-light">({movie.ratings_count})</span>
                </>
              ) : (
                "-"
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center content-center">
              <div className="">{movie.comments_count}</div>
              <MdComment className="text-2xl ml-2 text-black mr-4 hover:cursor-pointer hover:shadow-sm" />
            </div>
            <FaRegBookmark className="text-xl text-black mr-4 hover:cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/3 m-2 h-20 place-self-center items-center  space-x-2">
        <Rating
          unratedColor="amber"
          onChange={(value) => setNewRating(value)}
          value={newRating}
        />
        ;
        <button
          onClick={addNewRating}
          className="bg-[#FFD700] text-black font-bold p-2  rounded">
          Rate
        </button>
      </div>
      <div className="flex w-full md:w-1/3 m-2 place-self-center space-x-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (newComment.trim().length > 0) {
                addComment();
              }
            }
          }}
        />
        <button
          onClick={addComment}
          className="bg-[#008080] text-black font-bold py-2 px-4 rounded">
          Add
        </button>
      </div>
      <div>
        <h2 className="font-bold text-[#d0d0d0] mt-10">Comments</h2>
        <div className="flex flex-col w-full md:w-1/3 m-2 place-self-center space-y-2">
          {movie.comments
            .slice()
            .reverse()
            .map((comment: any) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg ">
                <div className="flex justify-between items-center">
                  <div className="font-bold">{comment.content}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
