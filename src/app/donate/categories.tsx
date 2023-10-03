export default function DonateCategories() {
    let categories = [
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
    return (
      <div className="flex flex-col object-contain m-5 bg-slate-100 border-r-4 pr-4">
        <div className="text-2xl font-bold p-1">Categories</div>
        <div className="">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="second-hand-category">{category.name}</div>
              <div className="">
                {category.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="second-hand-subcategory">
                    {subcategory.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  