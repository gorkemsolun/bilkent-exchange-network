import Categories from "../../../components/categories";
import SecondHandItem from "./secondhanditem";
import SearchBar from "../../../components/searchbar";
import "../../../styles/globals.css";
import CreatePostButton from "@/components/createpostbutton";
import CreateItem from "@/components/createItem";

export default function SecondHand() {
  const secondHandItems = [
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
    {
      id: 3,
      title: "gilgamesh",
      description: "desssscrip",
      category: "Book",
      imgSrc: "/cs319.png",
      price: "100",
    },
  ];

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