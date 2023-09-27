import SecondHandCategories from "./secondhandcategories";
import "../../styles/globals.css";

export default function SecondHand() {
  return (
    <div className="flex flex-row grow">
      <SecondHandCategories></SecondHandCategories>
      <div className="w-full h-full">
        <img className="" src="cs319.png" alt="cs319" />
      </div>
    </div>
  );
}
