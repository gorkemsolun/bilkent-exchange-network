import { useState } from "react";
import "../App.css";

interface Categories {
  /** TODO: prop types needed to be created */
}

export default function Categories(props) {
  const categoriesData = [
    {
      name: "Category 1",
      subcategories: [{ name: "Subcategory 1" }, { name: "Subcategory 2" }],
    },
    { name: "Category 2", subcategories: [{ name: "Subcategory 1" }] },
    {
      name: "Category 3",
      subcategories: [
        { name: "Subcategory 1" },
        { name: "Subcategory 2" },
        { name: "Subcategory 3" },
      ],
    },
  ];

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  const handleFilter = () => {
    props.onFilter({
      minPrice,
      maxPrice,
      minDate,
      maxDate,
      checkedCategories,
    });
  };

  /** TODO: This should be done by id instead of name */
  const handleCategoryChange = (subcategoryName: string) => {
    if (checkedCategories.includes(subcategoryName)) {
      setCheckedCategories(
        checkedCategories.filter((name) => name !== subcategoryName)
      );
    } else {
      setCheckedCategories([...checkedCategories, subcategoryName]);
    }
  };

  return (
    <div className="flex flex-col object-contain m-3 bg-slate-100 border-r-4 pr-3">
      <div className="text-2xl font-bold p-1">Categories</div>
      <div className="mb-3">
        {categoriesData.map((category, index) => (
          <div key={index}>
            <div className="second-hand-category">{category.name}</div>
            {/** TODO: We should be able to check categories */}
            <div className="">
              {category.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex} className="second-hand-subcategory">
                  <input
                    key={subIndex}
                    type="checkbox"
                    value={subcategory.name}
                    checked={checkedCategories.includes(subcategory.name)}
                    onChange={() => handleCategoryChange(subcategory.name)}
                  />
                  <label>{subcategory.name}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {(props.type === "secondhand" || props.type === "sectionExchange") && (
        <div className="mb-3 flex flex-column second-hand-category">
          <div className="mb-1">
            <label>Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border p-2 rounded-md w-30"
            />
          </div>

          <div>
            <label>Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border p-2 rounded-md w-30"
            />
          </div>
        </div>
      )}

      <div className="mb-3 flex flex-column second-hand-category">
        <div className="mb-1">
          <label>Earliest Date</label>
          <input
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(Number(e.target.value))}
            className="border p-2 rounded-md w-30"
          />
        </div>
        <div>
          <label>Latest Date</label>
          <input
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(Number(e.target.value))}
            className="border p-2 rounded-md w-30"
          />
        </div>
      </div>
      <div className="flex flex-row">
        <button
          onClick={handleFilter}
          className="bg-red-500 text-white p-2 rounded-md ml-2 w-20"
        >
          Cancel
        </button>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded-md ml-2 w-20"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
