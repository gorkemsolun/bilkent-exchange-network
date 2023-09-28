import SecondHandCategories from "./secondhandcategories";
import SecondHandItem from "../../components/SecondHandItem"
import "../../styles/globals.css";

export default function SecondHand() {
  const secondHandItems = [{  // dummy data
    id: 1,
    title: "tragedy of hamlet",
    description: "desssscriptttttttttionnnnnnnnn offfffffffffff trrrrrrragedyyyyyyyyyyy offfffff hammmmmmlettttttttttt",
    category: "Book",
    imgSrc: "cs319.png",
    price: "500"
  },
  {
    id: 2,
    title: "gilgamesh",
    description: "desssscriptttttttttionnnnnnnnn offfffffffffff giiiiiiilgaaaaaaaaameshhhhhhhhhhhhhhhhh",
    category: "Book",
    imgSrc: "cs319.png",
    price: "100"
  }];

  return (
    <div className="flex flex-row grow">
      <SecondHandCategories></SecondHandCategories>
      <div className="w-full h-full">
        <SecondHandItem secondHandItems={secondHandItems}/>
      </div>
    </div>
  );
}
