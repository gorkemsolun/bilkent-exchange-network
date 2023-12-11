import { useState } from "react";

export default function SearchBar(props: {
  type: string;
  onSearch: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  const handleSearch = () => {
    // Perform search based on `searchTerm`
    props.onSearch(searchTerm);
  };

  return (
    <div className="inline-flex items-center bg-purple-300 rounded-full mx-2 ">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search..."
        className="border p-2 search-bar rounded-full m-2 bg-white"
      />

      {/* Sort Dropdown */}
      <div className="relative">
        <div className=" right-0 mt-2 p-2 border bg-white center m-2 rounded-full text-black">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-white"
            title="Sort By"
          >
            <option value="" disabled hidden>
              Sort By
            </option>

            {props.type === "secondhand" && (
              <>
                <option value="price">Price ↓</option>
                <option value="price">Price ↑</option>
              </>
            )}
            <option value="date">Date ↓</option>
            <option value="date">Date ↑</option>
          </select>
        </div>
      </div>
    </div>
  );
}
