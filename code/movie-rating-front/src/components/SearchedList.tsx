import Link from "next/link";
import { MdMovie } from "react-icons/md";

export default function SearchedList({ movies }) {
  return movies.map((movie) => (
    <div
      key={movie.id}
      className="flex flex-col bg-[#E0E0E0] p-4 mt-2 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer space-y-4 mx-4">
      <Link href={`/movies/${movie.id}`}>
        <div className="flex content-around items-center">
          <MdMovie className="text-4xl text-black mr-4" />
          <h2 className="font-bold ">{movie.title}</h2>
        </div>
      </Link>
    </div>
  ));
}
