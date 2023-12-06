import Categories from "../../components/categories.tsx";
import SecondHandItem from "./secondhanditem.tsx";
import SearchBar from "../../components/searchbar.tsx";
import "../../App.css";
import CreatePostButton from "../../components/createpostbutton.tsx";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SecondHand() {
  const [secondHandItems, setSecondHandItems] = useState([]);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setLoading(true);
    axios
      .get("http://localhost:3000/secondhand/secondhanditem")
      .then((res) => {
        setSecondHandItems(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-row grow">
      <Categories type="secondhand"></Categories>
      <div className="w-full h-full">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchBar type="secondhand" />
          <CreatePostButton type="secondhand" />
        </div>
        <SecondHandItem secondHandItems={secondHandItems} />
      </div>
    </div>
  );
}
