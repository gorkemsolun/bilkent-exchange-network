import DonateCategories from "./categories";
import DonateItem from "./donateitem";
import "../../../styles/globals.css";
import SearchBar from "./searchbar";

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
      <DonateCategories></DonateCategories>
      <div className="w-full h-full">
        <SearchBar/>
        <DonateItem donateItems={donateItems} />
      </div>
    </div>
  );
}
