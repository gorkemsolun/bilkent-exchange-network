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
  const [checkedStatus, setCheckedStatus] = useState<string>("all");

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
      status: checkedStatus,
    });
  };

  const onCheckStatus = (status: string) => {
    if (checkedStatus === "all") {
      if (status === "Lost") {
        setCheckedStatus("Lost");
      } else {
        setCheckedStatus("Found");
      }
    } else {
      if (status === "Lost" && checkedStatus === "Lost") {
        setCheckedStatus("all");
      } else if (status === "Found" && checkedStatus === "Found") {
        setCheckedStatus("all");
      } else if (status === "Lost" && checkedStatus === "Found") {
        setCheckedStatus("Lost");
      } else if (status === "Found" && checkedStatus === "Lost") {
        setCheckedStatus("Found");
      }
    }
  };

  const onResetClicked = () => {
    setCheckedCategories([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinDate(undefined);
    setMaxDate(undefined);
  };

  return (
    <div className="flex flex-col object-contain m-3 bg-slate-100 border-r-4 pr-1 w-18">
      <div className="text-2xl font-bold p-1">Categories</div>
      <div className="mb-3">
        {categories[props.type as keyof typeof categories] &&
          categories[props.type as keyof typeof categories].map(
            (category: string, index: number) => (
              <div key={index} className="text-start ml-1">
                <div className="second-hand-category">
                  <input
                    key={index}
                    type="checkbox"
                    value={category}
                    checked={checkedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-0.5"
                    placeholder="Search..."
                  />
                  <label>{category}</label>
                </div>
              </div>
            )
          )}
      </div>
      {(props.type === "secondhand" || props.type === "sectionExchange") && (
        <div className="mb-3 flex flex-row second-hand-category">
          <div className="mb-1 mr-1 max-w-1/2">
            <label>Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border p-2 rounded-md bg-white w-full"
              placeholder="Min Price"
            />
          </div>

          <div className="mb-1 max-w-1/2">
            <label>Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border p-2 rounded-md bg-white w-full"
              placeholder="Max Price"
            />
          </div>
        </div>
      )}
      {props.type === "lostfound" && (
        <div>
          <div>
            <input
              type="checkbox"
              value="Lost"
              checked={checkedStatus === "Lost"}
              onChange={() => onCheckStatus("Lost")}
              className="mr-0.5"
              placeholder="Lost"
            />
            <label>Lost</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Found"
              checked={checkedStatus === "Found"}
              onChange={() => onCheckStatus("Found")}
              className="mr-0.5"
              placeholder="Found"
            />
            <label>Found</label>
          </div>
        </div>
      )}
      <div className="mb-3 flex flex-column second-hand-category max-w-1/4">
        <div className="flex flex-column mb-1 basis-1/4 max-w-1/8">
          <label>Earliest Date</label>
          <input
            type="date"
            value={minDate?.toString()}
            onChange={(e) => setMinDate(new Date(e.target.value))}
            className="border p-2 rounded-md bg-white w-1"
            placeholder="Earliest Date"
          />
        </div>
        <div className="flex flex-column mb-1 basis-1/4 max-w-1/4">
          <label>Latest Date</label>
          <input
            type="date"
            value={maxDate?.toString()}
            onChange={(e) => setMaxDate(new Date(e.target.value))}
            className="border p-2 rounded-md bg-white max-w-1/4 w-1"
            placeholder="Latest Date"
          />
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <button
          onClick={onResetClicked}
          className="bg-red-500 text-white p-2 rounded-md ml-2 w-20"
          type="reset"
        >
          Reset
        </button>
        <button
          onClick={onFilterClicked}
          className="bg-blue-500 text-white p-2 rounded-md ml-2 w-20"
          type="submit"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
