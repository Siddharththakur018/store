import heroImage1 from "../assets/hero-image.png";

const Carousel = () => {
  return (
    <>
      <div className="w-[1300px] mx-auto mt-10">
        <div className="flex items-center">
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
            <div>
              <img
                src={heroImage1}
                alt="hero-image-1"
                className="w-96 object-contain"
              />
            </div>
          </div>

          <div>
            <div>
              <div>
                <div>
<p>Best</p>
<p>Products</p>
                </div>

                <div>

                </div>
              </div>
            </div>
            <div>
              <p className="h-20 w-20 border">asa</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
