import { MdMovie } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface MovieProps {
  title: string;
  rating: number;
  ratings_count: number;
  comments_count: number;
  //   onClick: (id: number) => void;
}

export default function MovieCard({
  title,
  rating,
  ratings_count,
  comments_count,
}: MovieProps) {
  return (
    // <div className="p-16 bg-[#2C3E50] w-full h-screen">
    <div className="flex flex-col bg-[#E0E0E0] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer space-y-4">
      <div className="flex content-around items-center">
        <MdMovie className="text-4xl text-black mr-4" />
        <h2 className="font-bold ">{title}</h2>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center content-center">
          <FaStar className="text-2xl text-yellow-800 mr-2 " />
          <div className="font-bold ">
            {rating !== null && rating !== undefined ? (
              <>
                {parseFloat(rating).toFixed(2)}{" "}
                <span className="font-light">({ratings_count})</span>
              </>
            ) : (
              "-"
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center content-center">
            <div className="">{comments_count}</div>
            <MdComment className="text-2xl ml-2 text-black mr-4 hover:cursor-pointer hover:shadow-sm" />
          </div>
          <FaRegBookmark className="text-xl text-black mr-4 hover:cursor-pointer" />
        </div>
      </div>
    </div>
    // </div>
  );
}
