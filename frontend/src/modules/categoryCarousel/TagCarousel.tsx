import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TagCarousel = () => {
  const [category, setCategory] = useState<string[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-5 whitespace-nowrap animate-scroll"
        ref={containerRef}
      >
        {/* Repeat enough times to fill container and make seamless scroll */}
        {[...category, ...category].map((item, index) => (
          <div
            key={`${item}-${index}`}
            onClick={() => navigate(`/category/${item}`)}
            className="shadow-md p-4 bg-gray-200 rounded-md cursor-pointer"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </div>
        ))}
      </div>

      <style>
        {`
          .animate-scroll {
            display: flex;
            animation: scroll 20s linear infinite;
          }

          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* scroll width of one set */
          }
        `}
      </style>
    </div>
  );
};

export default TagCarousel;
