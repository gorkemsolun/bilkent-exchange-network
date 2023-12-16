import { useState } from "react";
import { categories, courses } from "../../data-types/constants";
import { FilterProps } from "../../data-types/props";

export default function Filters(props: FilterProps) {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();
  const [desiredCourse, setDesiredCourse] = useState<string>("All");
  const [offeredCourse, setOfferedCourse] = useState<string>("All");
  const [desiredSection, setDesiredSection] = useState<number | undefined>(
    undefined
  );
  const [offeredSection, setOfferedSection] = useState<number | undefined>(
    undefined
  );
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [checkedStatus, setCheckedStatus] = useState<string>("All");

  const handleCategoryChange = (category: string) => {
    if (checkedCategories.includes(category)) {
      setCheckedCategories(
        checkedCategories.filter((name) => name !== category)
      );
    } else {
      setCheckedCategories([...checkedCategories, category]);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0) {
      setPage(page);
    } else {
      setPage(1);
    }
  };

  const handlePostPerPageChange = (postsPerPage: number) => {
    if (postsPerPage > 0) {
      setLimit(postsPerPage);
    } else {
      setLimit(10);
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
      desiredCourse: desiredCourse,
      offeredCourse: offeredCourse,
      desiredSection: desiredSection,
      offeredSection: offeredSection,
      page: page,
      limit: limit,
    });
  };

  const onCheckStatus = (status: string) => {
    if (checkedStatus === "All") {
      if (status === "Lost") {
        setCheckedStatus("Lost");
      } else {
        setCheckedStatus("Found");
      }
    } else {
      if (status === "Lost" && checkedStatus === "Lost") {
        setCheckedStatus("All");
      } else if (status === "Found" && checkedStatus === "Found") {
        setCheckedStatus("All");
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
    setCheckedStatus("All");
    setDesiredCourse("All");
    setOfferedCourse("All");
    setDesiredSection(undefined);
    setOfferedSection(undefined);
  };

  const onCourseChange = (course: string, isDesired: boolean) => {
    if (isDesired) {
      if (!course) {
        setDesiredCourse("All");
      } else {
        setDesiredCourse(course);
      }
    } else {
      if (!course) {
        setOfferedCourse("All");
      } else {
        setOfferedCourse(course);
      }
    }
  };

  const onSectionChange = (section: number, isDesired: boolean) => {
    if (isDesired) {
      if (section === 0) {
        setDesiredSection(undefined);
      } else {
        setDesiredSection(section);
      }
    } else {
      if (section === 0) {
        setOfferedSection(undefined);
      } else {
        setOfferedSection(section);
      }
    }
  };

  return (
    <div className="flex flex-col object-contain m-3 bg-slate-100 border-r-4 pr-1 w-18">
      <div className="text-2xl font-bold p-1">Filters</div>
      <div className="mb-3">
        {props.type !== "sectionexchange" &&
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
      {props.type === "secondhand" && (
        <div className="mb-3 flex flex-row second-hand-category">
          <div className="mb-1 mr-1 max-w-1/2">
            <label>Min Price</label>
            <input
              type="number"
              value={minPrice === undefined ? "" : minPrice}
              onChange={(e) =>
                setMinPrice(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className="border p-2 rounded-md bg-white w-full"
              placeholder="Min Price"
            />
          </div>

          <div className="mb-1 max-w-1/2">
            <label>Max Price</label>
            <input
              type="number"
              value={maxPrice === undefined ? "" : maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
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
      {props.type === "sectionexchange" && (
        <div>
          <div>
            <div className="mb-3">
              <label>Desired Course</label>
              <select
                value={desiredCourse}
                onChange={(e) => onCourseChange(e.target.value, true)}
                className="border p-2 rounded-md bg-white"
                title="Desired Course"
              >
                <option value="">Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Offered Course</label>
              <select
                value={offeredCourse}
                onChange={(e) => onCourseChange(e.target.value, false)}
                className="border p-2 rounded-md bg-white"
                title="Offered Course"
              >
                <option value="">Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label>Desired Section Number</label>
              <input
                type="number"
                defaultValue={desiredSection}
                onChange={(e) => onSectionChange(Number(e.target.value), true)}
                min={1}
                className="border p-2 rounded-md bg-white"
                placeholder="Desired Section Number"
              />
            </div>
            <div className="mb-3">
              <label>Offered Section Number</label>
              <input
                type="number"
                defaultValue={offeredSection}
                onChange={(e) => onSectionChange(Number(e.target.value), false)}
                min={1}
                className="border p-2 rounded-md bg-white"
                placeholder="Offered Section Number"
              />
            </div>
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

      <div className="mb-3 flex flex-row second-hand-category">
        <div className="mb-1 mr-1 max-w-1/2">
          <label>Page Number</label>
          <input
            type="number"
            value={page}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="border p-2 rounded-md bg-white w-full"
            placeholder="Min Price"
          />
        </div>

        <div className="mb-1 max-w-1/2">
          <label>Posts per Page</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => handlePostPerPageChange(Number(e.target.value))}
            className="border p-2 rounded-md bg-white w-full"
            placeholder="Max Price"
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
