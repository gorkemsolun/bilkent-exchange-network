import SecondHandCategories from "./secondhandcategories";
import SecondHandItem from "./secondhanditem";
import SearchBar from "./searchbar";
import "../../../styles/globals.css";

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
      <SecondHandCategories></SecondHandCategories>
      <div className="w-full h-full">
        <SearchBar/>
        <SecondHandItem secondHandItems={secondHandItems} />
      </div>
    </div>
  );
}
