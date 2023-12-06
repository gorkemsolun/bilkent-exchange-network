import SectionItem from "./sectionitem";
import TopRow from "./toprow";
import "../../App.css";
import SearchBar from "../../components/searchbar";
import Categories from "../../components/categories";
import CreatePostButton from "../../components/createpostbutton";

export default function SectionExchange() {
  // dummy data
  const sectionItems = [
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Görkem Kadir Solun",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
    {
      id: 1,
      name: "Emir Tuğlu",
      offeredSection: "CS 224-2",
      desiredSection: "CS 224-1",
      date: "21.11.2023 11.17",
    },
  ];

  return (
    <div className="flex flex-row grow">
      <Categories type="sectionExchange"></Categories>
      <div className="w-full h-full">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchBar type="sectionExchange" />
          <CreatePostButton type="sectionExchange" />
        </div>
        <TopRow />
        <SectionItem sectionItems={sectionItems} />
      </div>
    </div>
  );
}
