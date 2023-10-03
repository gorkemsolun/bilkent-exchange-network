import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../../styles/globals.css";

interface ForumItemProps {
    forumItems: {
      id: number;
      title: string;
      description: string;
      category: string;
      imgSrc: string;
    }[];
  }
