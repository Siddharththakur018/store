import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TagCarousel = () => {
  const [category, setCategory] = useState<string[]>([]);
  const navigate = useNavigate();

  const getAllCategory = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/category`
    );
    setCategory(response.data.categories);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="overflow-hidden w-full flex justify-center items-center mx-auto py-8">
      <div
        className="flex gap-5 whitespace-nowrap animate-scroll"
        style={{ animation: `scroll 20s linear infinite` }}
      >
        {/* Duplicate the array for seamless infinite scroll */}
        {[...category, ...category].map((item) => (
          <div
            key={item}
            onClick={() => navigate(`/category/${item}`)}
            className="shadow-md p-4 bg-gray-200 rounded-md cursor-pointer"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default TagCarousel;
