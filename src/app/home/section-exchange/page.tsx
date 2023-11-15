import SectionItem from "./sectionItem";
import "../../../styles/globals.css";
import SearchBar from "../../../components/searchbar";
import Categories from "../../../components/categories";

export default function SecondHand() {
  const sectionItems = [
    {
      // dummy data
      id: 1,
      title: "Cs319 section 1",
      description: "Eray Tüzün",
      category: "Cs319",
      imgSrc: "/cs319.png",
      price: "33",
    },
    {
      id: 2,
      title: "Cs202",
      description: "Uğur Doğrusöz",
      category: "Cs202",
      imgSrc: "/cs319.png",
      price: "222",
    },
  ];

  return (
    <div className="flex flex-row grow">
      <Categories type="sectionExchange"></Categories>
      <div className="w-full h-full">
        <SearchBar/>
        <SectionItem sectionItems={sectionItems} />
      </div>
    </div>
  );
}
