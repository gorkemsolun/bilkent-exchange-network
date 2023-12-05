"use client";

export default function TopRow({}) {
  return (
    <div className="container" style={{ width: "100%" }}>
      <div className="row mb-3 mr-20 ml-5">
        <div className="col-12">
          <div
            className="card section-card row align-items-start justify-content-center pl-1 pr-1 py-2"
            style={{ backgroundColor: "white", fontWeight: "bold" }}
          >
            <div className="row align-items-start justify-content-start">
              <div
                className="col-md text-center" // Adjusted column size
                style={{ borderRight: "1px solid black" }}
              >
                <p className="card-text">{"Name"}</p>
              </div>
              <div
                className="col-md text-center" // Adjusted column size
                style={{ borderRight: "1px solid black" }}
              >
                <p className="card-text">{"Offered Section"}</p>
              </div>
              <div
                className="col-md text-center" // Adjusted column size
                style={{ borderRight: "1px solid black" }}
              >
                <p className="card-text">{"Desired Section"}</p>
              </div>
              <div
                className="col-md text-center" // Adjusted column size
                style={{ borderRight: "1px solid black" }}
              >
                <p className="card-text">{"DM"}</p>
              </div>
              <div
                className="col-md text-center" // Adjusted column size
              >
                <p className="card-text">{"Date"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
