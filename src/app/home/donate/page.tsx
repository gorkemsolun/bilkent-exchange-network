import DonateItem from "./donateItem";
import "../../../styles/globals.css";
import SearchBar from "../../../components/searchbar";
import Categories from "../../../components/categories";

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
        <SearchBar />
        <DonateItem donateItems={donateItems} />
      </div>
    </div>
  );
}
