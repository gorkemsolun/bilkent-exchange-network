import "../../../bootstrap.min.css";
import "../../App.css";

interface ForumItemProps {
  forumItems: {
    id: number;
    title: string;
    description: string;
    category: string;
  }[];
}

const handleForumItemClick = (itemId: number) => {
  // Replace this with your desired functionality when a forum element is clicked
  console.log(`Forum item with ID ${itemId} clicked!`);
};

export default function ForumItem({ forumItems }: ForumItemProps) {
  return (
    <div className="container">
      <div className="row">
        {forumItems.map((item) => (
          <div className="col-12 mb-4" key={item.id}>
            <div
              className="col-12"
              key={item.id}
              onClick={() => handleForumItemClick(item.id)}
              style={{ cursor: "pointer" }}
            >
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
                  <h2
                    className="card-title"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    {item.title.length < 50
                      ? item.title
                      : item.title.slice(0, 50) + "..."}
                  </h2>
                  <div
                    className="description-container"
                    style={{ height: "10%" }}
                  >
                    <p className="card-text">
                      {item.description.length < 315
                        ? item.description
                        : item.description.slice(0, 315) + "..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
