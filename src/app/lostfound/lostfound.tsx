import Categories from "../../components/categories.tsx";
import CreatePostButton from "../../components/createpostbutton.tsx";
import SearchBar from "../../components/searchbar.tsx";
import "../../App.css";
import LostFoundItem from "./lostfounditem.tsx";

export default function LostFound() {
  const lostFoundItems = [
    {
      // dummy data
      id: 1,
      title: "tragedy of hamlet",
      description:
        "desssscriptttttttttionnnnnnnnn offfffffffffff trrrrrrragedyyyyyyyyyyy offfffff hammmmmmlettttttttttt@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
      category: "Book",
      imgSrc: "/cs319.png",
      price: "500",
      isLost: true,
    },
    {
      id: 2,
      title: "gilgamesh",
      description: "desssscrip",
      category: "Book",
      imgSrc: "/cs319.png",
      price: "100",
      isLost: false,
    },
  ];

  return (
    <div className="flex flex-row grow">
      <Categories type="lostAndFound"></Categories>
      <div className="w-full h-full">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchBar type="lostAndFound" />
          <CreatePostButton type="lostAndFound" />
        </div>
        <LostFoundItem lostFoundItems={lostFoundItems} />
      </div>
    </div>
  );
}
