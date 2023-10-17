import ForumItem from "./forumitem";
import "../../../styles/globals.css";
import SearchBar from "./searchbar";

export default function Forum() {
  const ForumItems = [
    {
      // dummy data
      id: 1,
      title: "Help Me Find Her",
      description:
        "As I stood waiting at the bustling subway platform one ordinary afternoon, my eyes were suddenly captivated by a sight that transcended the ordinary. A girl, with an aura of effortless grace, stepped onto the train, and I felt an instant connection that left me utterly spellbound. She had long, flowing auburn hair that danced around her shoulders with each step, and her emerald-green eyes held a mysterious depth that seemed to hint at a thousand untold stories. Dressed in a vintage-inspired floral dress that swayed gently with her movements, she radiated a timeless elegance. Her laughter was as melodious as a songbird's, and it echoed in my mind long after she disappeared into the bustling crowd. In that fleeting moment, I fell hopelessly in love, and I couldn't help but wish for a serendipitous encounter that would reunite our paths once more, for she was a vision of enchantment that I yearned to know better.",
      category: "Find Me The Girl",
      imgSrc: "/cs319.png",
    },
    {
      id: 2,
      title: "gilgamesh",
      description:
        "Gilgamesh, the ancient epic of Mesopotamia, is often regarded as a cornerstone of world literature and mythology, but some readers may find it less engaging due to its archaic language, cultural disconnect, and lengthy descriptions. The narrative, while rich in historical and cultural significance, can come across as monotonous to modern readers who are more accustomed to fast-paced storytelling. Additionally, Gilgamesh's character, while complex, may not resonate with everyone, as his arrogance and quest for immortality can be seen as self-centered and lacking relatability. However, it's essential to acknowledge that personal preferences play a significant role in one's perception of literature, and what one person finds boring, another might find profoundly meaningful and enlightening.",
      category: "Book",
      imgSrc: "/cs319.png",
    },
  ];

  return (
    <div className="flex flex-row grow">
      <div className="w-full h-full">
        <SearchBar/>
        <ForumItem forumItems={ForumItems} />
      </div>
    </div>
  );
}
