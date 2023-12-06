import CreatePostButton from "../../components/createpostbutton";
import SearchBar from "../../components/searchbar";
import "../../App.css";
import BorrowItem from "./borrowitem";

export default function Borrow() {
  const BorrowItems = [
    {
      // dummy data
      id: 1,
      title: "I need Basys3 for this semester",
      description: "I can give it back at the end of the semester.",
      category: "Kategoriyi kaldiralim mi? burada ve forumda",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchBar type="borrow" />
          <CreatePostButton type="borrow" />
        </div>
        <BorrowItem borrowItems={BorrowItems} />
      </div>
    </div>
  );
}
