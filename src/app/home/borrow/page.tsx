import BorrowItem from "./borrowitem";
import "../../../styles/globals.css";
import SearchBar from "../../../components/searchbar";
import CreatePostButton from "@/components/createpostbutton";

export default function Borrow() {
  const BorrowItems = [
    {
      // dummy data
      id: 1,
      title: "I need Basys3 for this semester",
      description: "I can give it back at the end of the semester.",
      category: "Kategoriyi kaldıralım mı? burada ve forumda",
    },
    {
      id: 2,
      title: "gilgamesh",
      description: "need gilgamesh right now. i'll give it back tomorrow",
      category: "Book",
    },
    {
      id: 2,
      title: "gilgamesh",
      description: "need gilgamesh right now. i'll give it back tomorrow",
      category: "Book",
    },
    {
      id: 2,
      title: "gilgamesh",
      description: "need gilgamesh right now. i'll give it back tomorrow",
      category: "Book",
    },
  ];

  return (
    <div className="flex flex-row  grow">
      <div className="w-full h-full">
        <div className="flex justify-center">
          <SearchBar /> <CreatePostButton />
        </div>
        <BorrowItem borrowItems={BorrowItems} />
      </div>
    </div>
  );
}
