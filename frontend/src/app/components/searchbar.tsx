import { useState } from "react";

export default function SearchBar(props: {
  type: string;
  onSearch: (searchTerm: string) => void;
  sortType: string;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    props.onSearch(searchTerm);
  };

  return (
    <div className="inline-flex items-center bg-purple-300 rounded-full mx-2 ">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search..."
        className="border p-2 search-bar rounded-full m-2 bg-white"
      />
      <div className="relative">
        <div className=" right-0 mt-2 p-2 border bg-white center m-2 rounded-full text-black">
          <select
            value={props.sortType}
            onChange={(e) => props.setSortType(e.target.value)}
            className="bg-white"
            title="Sort By"
          >
            <option value="" disabled hidden>
              Sort By
            </option>

            {props.type === "secondhand" && (
              <>
                <option value="price-desc">Price ↓</option>
                <option value="price-asc">Price ↑</option>
              </>
            )}
            <option value="date-desc">Date ↓</option>
            <option value="date-asc">Date ↑</option>
          </select>
        </div>
      </div>
    </div>
  );
}
