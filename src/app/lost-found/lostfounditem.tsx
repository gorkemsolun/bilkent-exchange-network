import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../../styles/globals.css";

interface lostFoundItemProps {
    lostFoundItems: {
      id: number;
      title: string;
      description: string;
      category: string;
      imgSrc: string;
      price: string;
      isLost: boolean;
    }[];
  }

export default function LostFoundItem({lostFoundItems} : lostFoundItemProps) {
    return (
    <>
        <div className="container" >
        <div className="row">
            {lostFoundItems.map((item) => (
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4" key={item.id}>
                <div className="card">
                <div className="position-relative">
                    <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                        {item.category}
                    </span>
                    { item.isLost ? (
                        <span className="badge bg-danger rounded-pill position-absolute top-0 end-12 m-2">
                            Lost
                        </span>
                    ) : (
                        <span className="badge bg-success rounded-pill position-absolute top-0 end-12 m-2">
                            Found
                        </span>
                    )}
                    <img className="card-img" src={item.imgSrc} alt="Vans" />
                </div>
                <div className="card-img-overlay d-flex justify-content-end">
                    <a href="#" className="card-link text-danger like">
                    <i className="fas fa-heart"></i>
                    </a>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <div className="description-container" style={{ height: '100px' }}>
                    <p className="card-text">{item.description.length < 75 ? item.description : (item.description.slice(0, 75) + "...")}</p>
                  </div>                    <div className="buy d-flex justify-content-between align-items-center">
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
    )
}