import LostFoundCategories from "./categories";
import LostFoundItem from "./lostfounditem";
import "../../../styles/globals.css";

export default function LostFound() {
  const lostFoundItems = [
    {
      // dummy data
      id: 1,
      title: "tragedy of hamlet",
      description:
        "desssscriptttttttttionnnnnnnnn offfffffffffff trrrrrrragedyyyyyyyyyyy offfffff hammmmmmlettttttttttt@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
      category: "Book",
      imgSrc: "cs319.png",
      price: "500",
      isLost: true,
    },
    {
      id: 2,
      title: "gilgamesh",
      description: "desssscrip",
      category: "Book",
      imgSrc: "cs319.png",
      price: "100",
      isLost: false,
    },
  ];

  return (
    <div className="flex flex-row grow">
      <LostFoundCategories></LostFoundCategories>
      <div className="w-full h-full">
        <LostFoundItem lostFoundItems={lostFoundItems} />
      </div>
    </div>
  );
}
