import heroImage1 from "../assets/hero-image.png";
import heroImage2 from "../assets/hero-image-1.png";
import heroimage3 from "../assets/hero-image-2.png"
import { FaLongArrowAltRight } from "react-icons/fa";

const Carousel = () => {
  return (
    <div className="mx-auto flex justify-center items-center mt-10">
      <div className="flex items-center gap-8">
        {/* LEFT CARD */}
        <div className="flex gap-2 rounded-4xl h-[480px] items-center p-4 bg-green-200">
          <div>
            <p className="text-xs rounded-full bg-green-300 p-3 w-80 mb-6">
              <span className="bg-green-700 rounded-full p-2 text-white mr-2">
                NEWS
              </span>
              Free Shippping on Orders above ₹3000
            </p>
            <p className="mb-8 text-5xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent font-bold">
              Gadgets you'll love. <br /> Prices you'll trust.
            </p>
            <div>
              <p className="font-bold">Starts from</p>
              <p className="text-4xl font-bold">₹400</p>
            </div>
            <button className="mt-8 rounded-lg cursor-pointer text-white bg-black p-6 w-52">
              Learn More
            </button>
          </div>
          <img
            src={heroImage1}
            alt="hero-image-1"
            className="w-96 object-contain"
          />
        </div>

        {/* RIGHT SECTION */}
        <div>
          <div className="flex items-center justify-around bg-orange-200 p-4 rounded-4xl h-52 mb-4">
            <div>
              <div className="mb-4">
                <p className="text-4xl">Best</p>
                <p className="text-4xl">Products</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm">View More</p>
                <FaLongArrowAltRight className="h-6 w-6" />
              </div>
            </div>
            <div>
              <img src={heroImage2} alt="hero-image-2" className="h-40 w-40 object-contain"/>
            </div>
          </div>

          <div className="flex items-center justify-around bg-blue-200 p-4 rounded-4xl h-52 mb-4">
            <div>
              <div className="mb-4">
                <p className="text-4xl">20 %</p>
                <p className="text-4xl">discounts</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm">View More</p>
                <FaLongArrowAltRight className="h-6 w-6" />
              </div>
            </div>
            <div>
              <img src={heroimage3} alt="hero-image-2" className="h-40 w-40 object-contain"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Carousel;
