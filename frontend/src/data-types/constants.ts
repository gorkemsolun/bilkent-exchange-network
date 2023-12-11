export const categories = {
  secondhand: [
    "Books",
    "Electronics",
    "Home",
    "Lecture Materials",
    "Clothes",
    "Hobbies",
    "Other",
  ],
  lostfound: [
    "Books",
    "Electronics",
    "Home ",
    "Lecture Materials",
    "Clothes",
    "Hobbies",
    "Other",
  ],
  donate: [
    "Books",
    "Electronics",
    "Home",
    "Lecture Materials",
    "Clothes",
    "Hobbies",
    "Other",
  ],
};

export const urls = {
  secondhand:
    "http://localhost:3000/secondhand/secondhandpost/c/:categories/p/:price/d/:date/s/:search",
  lostfound:
    "http://localhost:3000/lostfound/lostfoundpost/c/:categories/s/:status/d/:date/s/:search",
  donate:
    "http://localhost:3000/donate/donatepost/c/:categories/d/:date/s/:search",
};
