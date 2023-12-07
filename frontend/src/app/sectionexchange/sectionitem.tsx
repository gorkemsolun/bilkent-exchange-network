import "../../App.css";
import "../../bootstrap.css";

interface SectionItemProps {
  sectionItems: {
    id: number;
    name: string;
    offeredSection: string;
    desiredSection: string;
    date: string;
  }[];
}

function handleDMClick(): void {
  console.log("DM Box Clicked");
}

export default function SectionItem({ sectionItems }: SectionItemProps) {
  return (
    <div className="container" style={{ width: "100%" }}>
      {sectionItems.map((item) => (
        <div className="row mb-1 mr-20 ml-5" key={item.id}>
          <div className="col-12">
            <div
              className="card section-card row align-items-start justify-content-center pl-1 pr-1 py-2"
              style={{ backgroundColor: "white" }}
            >
              <div className="row align-items-start justify-content-start">
                <div
                  className="col-md text-center" // Adjusted column size
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="card-text">{item.name}</p>
                </div>
                <div
                  className="col-md text-center" // Adjusted column size
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="card-text">{item.offeredSection}</p>
                </div>
                <div
                  className="col-md text-center" // Adjusted column size
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="card-text">{item.desiredSection}</p>
                </div>
                <div
                  className="col-md text-center" // Adjusted column size
                  style={{ borderRight: "1px solid black" }}
                >
                  <div>
                    {/* DM Box Image with hover title and click event */}
                    <img
                      className="img-fluid mx-auto d-block"
                      style={{ maxWidth: "4vw", maxHeight: "4vh" }}
                      src="/dmbox.png" // Replace with your image URL
                      alt="DM Box"
                      title="Send DM" // Tooltip on hover
                      onClick={() => handleDMClick()} // Your click handler
                    />
                  </div>
                </div>
                <div
                  className="col-md text-center" // Adjusted column size
                >
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
