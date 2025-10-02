import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 rounded-full p-2 w-80 bg-gray-200">
          <CiSearch className="h-6 w-6 cursor-pointer" />
          <input
            type="text"
            placeholder="Search Products"
            className="focus:ring-0 outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
