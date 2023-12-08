import { useState } from "react";
import "../App.css";
import { categories } from "../data-types/constants";
import { Category, CategoryProps, Subcategory } from "../data-types/datatypes";

export default function Categories(props: CategoryProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  /*
   TODO: props.type should be implemented for other pages
  */
  if (props.type === "") {
    props.type = "secondhand";
  }

  const handleCategoryChange = (category: string) => {
    if (checkedCategories.includes(category)) {
      setCheckedCategories(
        checkedCategories.filter((name) => name !== category)
      );
    } else {
      setCheckedCategories([...checkedCategories, category]);
    }
  };

  const onFilterClicked = () => {
    props.passCategories(checkedCategories);
  };

  const onResetClicked = () => {
    setCheckedCategories([]);
    setMinPrice(0);
    setMaxPrice(0);
    setMinDate(0);
    setMaxDate(0);
  };

  return (
    <div className="flex flex-col object-contain m-3 bg-slate-100 border-r-4 pr-3">
      <div className="text-2xl font-bold p-1">Categories</div>
      <div className="mb-3">
        {categories[props.type].map((category: Category, index: number) => (
          <div key={index}>
            <div className="second-hand-category">
              <input
                key={index}
                type="checkbox"
                value={category.name}
                checked={checkedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
              />
              <label>{category.name}</label>
            </div>

            <div>
              {category.subcategories.map(
                (subcategory: Subcategory, subIndex: number) => (
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
                )
              )}
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
          onClick={onResetClicked}
          className="bg-red-500 text-white p-2 rounded-md ml-2 w-20"
        >
          Reset
        </button>
        <button
          onClick={onFilterClicked}
          className="bg-blue-500 text-white p-2 rounded-md ml-2 w-20"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
