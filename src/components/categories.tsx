"use client";

import React, { useState } from "react";
import "../styles/globals.css";

interface Categories {
  /** TODO: prop types needed to be created */
}

export default function Categories(props: any) {
  let categoriesData = [
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

  let [minPrice, setMinPrice] = useState("");
  let [maxPrice, setMaxPrice] = useState("");
  let [minDate, setMinDate] = useState("");
  let [maxDate, setMaxDate] = useState("");
  let [checkedCategories, setCheckedCategories] = useState<string[]>([]);

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
                    onChange={(e) => handleCategoryChange(subcategory.name)}
                  />
                  <label>{subcategory.name}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      { /**TODO: this should be rendered with  */
        <div className="mb-3 flex flex-column second-hand-category">
          <div className="mb-1">
            <label>Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-2 rounded-md w-55"
            />
          </div>

          <div>
            <label>Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 rounded-md w-55"
            />
          </div>
        </div>
      }

      <div className="mb-3 flex flex-column second-hand-category">
        <div className="mb-1">
          <label>Earliest Date</label>
          <input
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
            className="border p-2 rounded-md w-55"
          />
        </div>
        <div>
          <label>Latest Date</label>
          <input
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
            className="border p-2 rounded-md w-55"
          />
        </div>
      </div>
      <div className="flex flex-column">
        <button
          onClick={handleFilter}
          className="bg-red-500 text-white px-3 py-2 rounded-md m-2"
        >
          Cancel
        </button>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
