import { useState } from "react";
import { categories, courses } from "../../data-types/constants";
import { FilterProps } from "../../data-types/props";

export default function Filters(props: FilterProps) {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
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
    setMinDate("");
    setMaxDate("");
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
    <div className="filter-outer-wrapper">
      <div className="filter-categories-wrapper">
        {props.type !== "sectionexchange" &&
          categories[props.type as keyof typeof categories].map(
            (category: string, index: number) => (
              <div key={index} className="filter-category">
                <input
                  key={index}
                  type="checkbox"
                  value={category}
                  checked={checkedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  placeholder="Category"
                />
                <span>{category}</span>
              </div>
            )
          )}
      </div>
      {props.type === "secondhand" && (
        <div className="filter-price-wrapper">
          <div className="filter-price">
            <span>Min Price</span>
            <input
              type="number"
              value={minPrice === undefined ? "" : minPrice}
              onChange={(e) =>
                setMinPrice(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className="filter-price-input"
              placeholder="Min Price"
            />
          </div>
          <div className="filter-price">
            <span>Max Price</span>
            <input
              type="number"
              value={maxPrice === undefined ? "" : maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className="filter-price-input"
              placeholder="Max Price"
            />
          </div>
        </div>
      )}
      {props.type === "lostfound" && (
        <div className="filter-lostfound-wrapper">
          <div>
            <input
              type="checkbox"
              value="Lost"
              checked={checkedStatus === "Lost"}
              onChange={() => onCheckStatus("Lost")}
              className="filter-lostfound-input"
              placeholder="Lost"
            />
            <span>Lost</span>
          </div>
          <div>
            <input
              type="checkbox"
              value="Found"
              checked={checkedStatus === "Found"}
              onChange={() => onCheckStatus("Found")}
              className="filter-lostfound-input"
              placeholder="Found"
            />
            <span>Found</span>
          </div>
        </div>
      )}
      {props.type === "sectionexchange" && (
        <div className="filter-sectionexchange-wrapper">
          <div className="filter-sectionexchange-course-outer-wrapper">
            <div className="filter-sectionexchange-course-wrapper">
              <span>Desired Course</span>
              <select
                value={desiredCourse}
                onChange={(e) => onCourseChange(e.target.value, true)}
                className="filter-sectionexchange-course-select"
                title="Desired Course"
              >
                <option
                  className="filter-sectionexchange-course-select-option"
                  value=""
                >
                  Select Course
                </option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-sectionexchange-course-wrapper">
              <span>Offered Course</span>
              <select
                value={offeredCourse}
                onChange={(e) => onCourseChange(e.target.value, false)}
                className="filter-sectionexchange-course-select"
                title="Offered Course"
              >
                <option
                  className="filter-sectionexchange-course-select-option"
                  value=""
                >
                  Select Course
                </option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-sectionexchange-section-outer-wrapper">
            <div className="filter-sectionexchange-section-wrapper">
              <label>Desired Section Number</label>
              <input
                type="number"
                defaultValue={desiredSection}
                onChange={(e) => onSectionChange(Number(e.target.value), true)}
                min={1}
                className="filter-sectionexchange-section-input"
                placeholder="Section"
              />
            </div>
            <div className="filter-sectionexchange-section-wrapper">
              <label>Offered Section Number</label>
              <input
                type="number"
                defaultValue={offeredSection}
                onChange={(e) => onSectionChange(Number(e.target.value), false)}
                min={1}
                className="filter-sectionexchange-section-input"
                placeholder="Section"
              />
            </div>
          </div>
        </div>
      )}
      <div className="filter-date-wrapper">
        <div className="filter-date-input-earliest-wrapper">
          <label>Earliest Date</label>
          <input
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
            className="filter-date-input-earliest"
            placeholder="Earliest Date"
          />
        </div>
        <div className="filter-date-input-latest-wrapper">
          <label>Latest Date</label>
          <input
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
            className="filter-date-input-latest"
            placeholder="Latest Date"
          />
        </div>
      </div>

      <div className="filter-page-post-number-wrapper">
        <div className="filter-page-number-wrapper">
          <span>Page Number</span>
          <input
            type="number"
            value={page}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="filter-page-number-input"
            placeholder="Min Price"
          />
        </div>

        <div className="filter-post-per-wrapper">
          <span>Posts per Page</span>
          <input
            type="number"
            value={limit}
            onChange={(e) => handlePostPerPageChange(Number(e.target.value))}
            className="filter-post-per-input"
            placeholder="Max Price"
          />
        </div>
      </div>

      <div className="filter-reset-filter-button-wrapper">
        {/* tailwind button styles */}
        <button
          onClick={onResetClicked}
          className="bg-red-500 text-white p-2 m-1 rounded-md w-20"
          type="reset"
        >
          Reset
        </button>
        <button
          onClick={onFilterClicked}
          className="bg-blue-500 text-white p-2 m-1 rounded-md w-20"
          type="submit"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
