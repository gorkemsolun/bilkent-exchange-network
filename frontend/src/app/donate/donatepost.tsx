import "../../bootstrap.css";
import "../../App.css";

interface donatePostProps {
  donatePosts: {
    id: number;
    title: string;
    description: string;
    category: string;
    imgSrc: string;
    price: string;
  }[];
}

export default function LostFoundPost({ donatePosts }: donatePostProps) {
  return (
    <>
      <div className="container">
        <div className="row">
          {donatePosts.map((post) => (
            <div
              className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4"
              key={post.id}
            >
              <div className="card">
                <div className="position-relative">
                  <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                    {post.category}
                  </span>
                  <img className="card-img" src={post.imgSrc} alt="Vans" />
                </div>
                <div className="card-img-overlay d-flex justify-content-end">
                  <a href="#" className="card-link text-danger like">
                    <i className="fas fa-heart"></i>
                  </a>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{post.title}</h4>
                  <div
                    className="description-container"
                    style={{ height: "100px" }}
                  >
                    <p className="card-text">
                      {post.description.length < 75
                        ? post.description
                        : post.description.slice(0, 75) + "..."}
                    </p>
                  </div>{" "}
                  <div className="buy d-flex justify-content-between align-posts-center">
                    <div className="price text-success">
                      <h5 className="mt-4"></h5>
                    </div>
                    <a href="#" className="btn btn-danger mt-3">
                      <i className="fas fa-shopping-cart"></i> Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
