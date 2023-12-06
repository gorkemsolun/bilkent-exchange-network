import DonateItem from "./donateitem.tsx";
import "../../App.css";
import SearchBar from "../../components/searchbar.tsx";
import Categories from "../../components/categories.tsx";
import CreatePostButton from "../../components/createpostbutton.tsx";

export default function Donate() {
  const donateItems = [
    {
      // dummy data
      id: 1,
      title: "tragedy of hamlet",
      description:
        "desssscriptttttttttionnnnnnnnn offfffffffffff trrrrrrragedyyyyyyyyyyy offfffff hammmmmmlettttttttttt@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
      category: "Book",
      imgSrc: "/cs319.png",
      price: "500",
    },
    {
      id: 2,
      title: "gilgamesh",
      description: "desssscrip",
      category: "Book",
      imgSrc: "/cs319.png",
      price: "100",
    },
  ];

  return (
    <div className="flex flex-row grow">
      <Categories type="donate"></Categories>
      <div className="w-full h-full">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchBar type="donate" />
          <CreatePostButton type="donate" />
        </div>
        <DonateItem donateItems={donateItems} />
      </div>
    </div>
  );
}
