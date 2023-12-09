import { useState } from "react";
import "../App.css";
import { categories } from "../data-types/constants";
import { FilterProps } from "../data-types/datatypes";

export default function Filters(props: FilterProps) {
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();
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
    props.passFilters({
      categories: checkedCategories,
      prices: {
        min: minPrice,
        max: maxPrice,
      },
      dates: {
        startDate: minDate,
        endDate: maxDate,
      },
    });
  };

  const onResetClicked = () => {
    setCheckedCategories([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinDate(undefined);
    setMaxDate(undefined);
  };

  return (
    <div
      className="flex flex-col object-contain m-3 bg-slate-100 border-r-4 pr-1"
      style={{ width: "18%" }}
    >
      <div className="text-2xl font-bold p-1">Categories</div>
      <div className="mb-3">
        {categories[props.type] &&
          categories[props.type].map((category: string, index: number) => (
            <div key={index} style={{ textAlign: "start", marginLeft: "1vw" }}>
              <div className="second-hand-category">
                <input
                  key={index}
                  type="checkbox"
                  value={category}
                  checked={checkedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  style={{ marginRight: "0.5vw" }}
                />
                <label>{category}</label>
              </div>
            </div>
          ))}
      </div>

      {(props.type === "secondhand" || props.type === "sectionExchange") && (
        <div className="mb-3 flex flex-row second-hand-category">
          <div
            className="mb-1"
            style={{ flex: "1", marginRight: "1%", maxWidth: "50%" }}
          >
            <label>Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border p-2 rounded-md bg-white w-full"
            />
          </div>

          <div className="mb-1" style={{ flex: "1", maxWidth: "50%" }}>
            <label>Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border p-2 rounded-md bg-white w-full"
            />
          </div>
        </div>
      )}

      <div className="mb-3 flex flex-row second-hand-category">
        <div
          className="mb-1"
          style={{ flex: "1", marginRight: "1%", maxWidth: "50%" }}
        >
          <label>Earliest Date</label>
          <input
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
            className="border p-2 rounded-md bg-white w-full"
          />
        </div>
        <div className="mb-1" style={{ flex: "1", maxWidth: "50%" }}>
          <label>Latest Date</label>
          <input
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
            className="border p-2 rounded-md bg-white w-full"
          />
        </div>
      </div>

      <div className="flex flex-row justify-center">
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
