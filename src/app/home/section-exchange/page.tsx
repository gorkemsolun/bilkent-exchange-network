import SectionItem from "./sectionitem";
import "../../../styles/globals.css";
import SearchBar from "../../../components/searchbar";
import Categories from "../../../components/categories";

export default function SectionExchange() {
  const sectionItems = [
    {
      // dummy data
      id: 1,
      username: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      username: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
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
