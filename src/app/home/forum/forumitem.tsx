import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../../styles/globals.css";

interface ForumItemProps {
  forumItems: {
    id: number;
    title: string;
    description: string;
    category: string;
    imgSrc: string;
  }[];
}

export default function ForumItem({ forumItems }: ForumItemProps) {
  return (
    <>
      <div className="container">
        <div className="row">
          {forumItems.map((item) => (
            <div className="col-12 mb-4" key={item.id}>
              <div className="card" style={{ width: "100%" }}>
                <div className="position-relative">
                  <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                    {item.category}
                  </span>
                </div>
                <div className="card-img-overlay d-flex justify-content-end">
                  <a href="#" className="card-link text-danger like">
                    <i className="fas fa-heart"></i>
                  </a>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <div
                    className="description-container"
                    style={{ height: "100px" }}
                  >
                    <p className="card-text">
                      {item.description.length < 75
                        ? item.description
                        : item.description.slice(0, 75) + "..."}
                    </p>
                  </div>
                  <div className="buy d-flex justify-content-between align-items-center">
                    <a href="#" className="btn btn-danger mt-3">
                      <i className="fas fa-shopping-cart"></i> See the Rest
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      );
    </>
  );
}
