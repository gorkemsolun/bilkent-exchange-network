import ForumPost from "./forumpost";
import "../../App.css";
import SearchBar from "../../components/searchbar";
import CreatePostButton from "../../components/createpostbutton";

export default function Forum() {
  const ForumPosts = [
    {
      // dummy data
      id: 1,
      title:
        "Help Me Find Her@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@qq",
      description:
        "As I stood waiting at the bustling subway platform one ordinary afternoon, my eyes were suddenly captivated by a sight that transcended the ordinary. A girl, with an aura of effortless grace, stepped onto the train, and I felt an instant connection that left me utterly spellbound. She had long, flowing auburn hair that danced around her shoulders with each step, and her emerald-green eyes held a mysterious depth that seemed to hint at a thousand untold stories. Dressed in a vintage-inspired floral dress that swayed gently with her movements, she radiated a timeless elegance. Her laughter was as melodious as a songbird's, and it echoed in my mind long after she disappeared into the bustling crowd. In that fleeting moment, I fell hopelessly in love, and I couldn't help but wish for a serendipitous encounter that would reunite our paths once more, for she was a vision of enchantment that I yearned to know better@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@QQ.",
      category: "Find Me The Girl",
    },
    {
      id: 2,
      title: "gilgamesh",
      description:
        "Gilgamesh, the ancient epic of Mesopotamia, is often regarded as a cornerstone of world literature and mythology, but some readers may find it less engaging due to its archaic language, cultural disconnect, and lengthy descriptions. The narrative, while rich in historical and cultural significance, can come across as monotonous to modern readers who are more accustomed to fast-paced storytelling. Additionally, Gilgamesh's character, while complex, may not resonate with everyone, as his arrogance and quest for immortality can be seen as self-centered and lacking relatability. However, it's essential to acknowledge that personal preferences play a significant role in one's perception of literature, and what one person finds boring, another might find profoundly meaningful and enlightening.",
      category: "Book",
    },
    {
      id: 2,
      title: "gilgamesh",
      description:
        "Gilgamesh, the ancient epic of Mesopotamia, is often regarded as a cornerstone of world literature and mythology, but some readers may find it less engaging due to its archaic language, cultural disconnect, and lengthy descriptions. The narrative, while rich in historical and cultural significance, can come across as monotonous to modern readers who are more accustomed to fast-paced storytelling. Additionally, Gilgamesh's character, while complex, may not resonate with everyone, as his arrogance and quest for immortality can be seen as self-centered and lacking relatability. However, it's essential to acknowledge that personal preferences play a significant role in one's perception of literature, and what one person finds boring, another might find profoundly meaningful and enlightening.",
      category: "Book",
    },
    {
      id: 2,
      title: "gilgamesh",
      description:
        "Gilgamesh, the ancient epic of Mesopotamia, is often regarded as a cornerstone of world literature and mythology, but some readers may find it less engaging due to its archaic language, cultural disconnect, and lengthy descriptions. The narrative, while rich in historical and cultural significance, can come across as monotonous to modern readers who are more accustomed to fast-paced storytelling. Additionally, Gilgamesh's character, while complex, may not resonate with everyone, as his arrogance and quest for immortality can be seen as self-centered and lacking relatability. However, it's essential to acknowledge that personal preferences play a significant role in one's perception of literature, and what one person finds boring, another might find profoundly meaningful and enlightening.",
      category: "Book",
    },
    {
      id: 2,
      title: "gilgamesh",
      description:
        "Gilgamesh, the ancient epic of Mesopotamia, is often regarded as a cornerstone of world literature and mythology, but some readers may find it less engaging due to its archaic language, cultural disconnect, and lengthy descriptions. The narrative, while rich in historical and cultural significance, can come across as monotonous to modern readers who are more accustomed to fast-paced storytelling. Additionally, Gilgamesh's character, while complex, may not resonate with everyone, as his arrogance and quest for immortality can be seen as self-centered and lacking relatability. However, it's essential to acknowledge that personal preferences play a significant role in one's perception of literature, and what one person finds boring, another might find profoundly meaningful and enlightening.",
      category: "Book",
    },
    {
      id: 2,
      title: "gilgamesh",
      description:
        "Gilgamesh, the ancient epic of Mesopotamia, is often regarded as a cornerstone of world literature and mythology, but some readers may find it less engaging due to its archaic language, cultural disconnect, and lengthy descriptions. The narrative, while rich in historical and cultural significance, can come across as monotonous to modern readers who are more accustomed to fast-paced storytelling. Additionally, Gilgamesh's character, while complex, may not resonate with everyone, as his arrogance and quest for immortality can be seen as self-centered and lacking relatability. However, it's essential to acknowledge that personal preferences play a significant role in one's perception of literature, and what one person finds boring, another might find profoundly meaningful and enlightening.",
      category: "Book",
    },
  ];

  return (
    <div className="flex flex-row  grow">
      <div className="w-full h-full">
        <div>
          <SearchBar type="forum" />
          <CreatePostButton type="forum" />
        </div>
        <ForumPost forumPosts={ForumPosts} />
      </div>
    </div>
  );
}
