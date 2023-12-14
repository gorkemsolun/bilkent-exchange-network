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
  borrow: [
    "Books",
    "Electronics",
    "Home",
    "Lecture Materials",
    "Clothes",
    "Hobbies",
    "Other",
  ],
  forum: [
    "Books",
    "Electronics",
    "Home",
    "Lecture Materials",
    "Clothes",
    "Hobbies",
    "Other",
  ],
};

export const courses = [
  "All",
  "CS 101",
  "MA 202",
  "ENG 101",
  "PHYS 201",
  "CHEM 101",
  "BIO 101",
  "PSY 101",
  "SOC 101",
  "HIST 101",
  "ART 101",
  "MATH 101",
  "PHIL 101",
  "ECON 101",
  "STAT 101",
  "ANTH 101",
  "GEOG 101",
  "POLI 101",
  "BUS 101",
  "MKTG 101",
  "FIN 101",
];

export const urlsGet = {
  secondhand:
    "http://localhost:3000/secondhand/secondhandpost/pg/:page/lm/:limit/c/:categories/p/:price/d/:date/s/:search",
  lostfound:
    "http://localhost:3000/lostfound/lostfoundpost/pg/:page/lm/:limit/c/:categories/s/:status/d/:date/s/:search",
  donate:
    "http://localhost:3000/donate/donatepost/pg/:page/lm/:limit/c/:categories/d/:date/s/:search",
  borrow:
    "http://localhost:3000/borrow/borrowpost/pg/:page/lm/:limit/c/:categories/d/:date/s/:search",
  sectionexchange:
    "http://localhost:3000/sectionexchange/sectionexchangepost/pg/:page/lm/:limit/p/:price/d/:date/s/:search/o/:offeredCourse/:offeredSection/d/:desiredCourse/:desiredSection",
  forum:
    "http://localhost:3000/forum/forumpost/pg/:page/lm/:limit/c/:categories/d/:date/s/:search",
};

export const urlsPost = {
  secondhand: "http://localhost:3000/secondhand/secondhandpost",
  lostfound: "http://localhost:3000/lostfound/lostfoundpost",
  donate: "http://localhost:3000/donate/donatepost",
  borrow: "http://localhost:3000/borrow/borrowpost",
  sectionexchange: "http://localhost:3000/sectionexchange/sectionexchangepost",
  forum: "http://localhost:3000/forum/forumpost",
};

export const defaultFilterParams = {
  categories: [],
  prices: {
    min: undefined,
    max: undefined,
  },
  dates: {
    startDate: undefined,
    endDate: undefined,
  },
  status: "All",
  desiredCourse: "All",
  offeredCourse: "All",
  desiredSection: undefined,
  offeredSection: undefined,
};
