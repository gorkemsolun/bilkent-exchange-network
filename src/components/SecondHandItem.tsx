import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";

interface SecondHandItemProps {
    secondHandItems: {
      id: number;
      title: string;
      description: string;
      category: string;
      imgSrc: string;
      price: string;
    }[];
  }

export default function SecondHandItem({secondHandItems} : SecondHandItemProps) {
    return (
    <>
        <div className="container">
        <div className="row">
            {secondHandItems.map((item) => (
            <div className="col-12 col-sm-8 col-md-6 col-lg-4" key={item.id}>
                <div className="card">
                <div className="position-relative">
                    <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                    {item.category}
                    </span>
                    <img className="card-img" src={item.imgSrc} alt="Vans" />
                </div>
                <div className="card-img-overlay d-flex justify-content-end">
                    <a href="#" className="card-link text-danger like">
                    <i className="fas fa-heart"></i>
                    </a>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-text">{item.description}</p>
                    <div className="buy d-flex justify-content-between align-items-center">
                    <div className="price text-success">
                        <h5 className="mt-4">${item.price}</h5>
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