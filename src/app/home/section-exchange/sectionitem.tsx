'use client'

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../../../styles/globals.css";

interface SectionItemProps {
  sectionItems: {
    id: number;
    username: string;
    offeredSection: string;
    desiredSection: string;
    date: string;
  }[];
}

function handleDMClick(id: number): void {
  console.log("DM Box Clicked");
}

export default function SectionItem({ sectionItems }: SectionItemProps) {
  return (
    <div className="container" style={{ width: "100%" }}>
      {sectionItems.map((item) => (
        <div className="row mt-3 mb-2 mr-20 ml-5" key={item.id}>
          <div className="col-12">
            <div
              className="card section-card row align-items-start justify-content-center pl-5"
              style={{ backgroundColor: "white", height: "8vh" }}
            >
              <div className="row align-items-start justify-content-start">
                <div
                  className="col-12 col-md-2 text-center"
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="card-text">{item.username}</p>
                </div>
                <div
                  className="col-12 col-md-2 text-center"
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="card-text">{item.offeredSection}</p>
                </div>
                <div
                  className="col-12 col-md-2 text-center"
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="card-text">{item.desiredSection}</p>
                </div>
                <div
                  className="col-12 col-md-2 text-center"
                  style={{ borderRight: "1px solid black" }}
                >
                  <div className="">
                    {/* DM Box Image with hover title and click event */}
                    <img
                      className="img-fluid mx-auto d-block"
                      style={{ maxWidth: "4vw", maxHeight: "4vh" }}
                      src="/dmbox.png" // Replace with your image URL
                      alt="DM Box"
                      title="DM" // Tooltip on hover
                      onClick={() => handleDMClick(item.id)} // Your click handler
                    />
                  </div>
                </div>
                <div className="col-12 col-md-2 text-center">
                  <p className="card-text">{item.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
