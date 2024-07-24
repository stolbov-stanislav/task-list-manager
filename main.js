import Nav from "./modules/nav.js";

const MOCK_DATA = [
  {
    id: "ida78779c8fe4d6",
    title: "CardView",
    tasks: [
      {
        isDone: true,
        label: "Discuss requirements",
      },
      {
        isDone: false,
        label: "Implement server side",
      },
    ],
  },
  {
    id: "ida89779c8fe4d5",
    title: "Refactoring",
    tasks: [
      {
        isDone: false,
        label: "Styles",
      },
      {
        isDone: true,
        label: "Scripts via modules",
      },
    ],
  },
];

const nav = new Nav(
  MOCK_DATA,
  (itemId) => console.log("list item clicked", itemId),
  (itemId) => console.log("removing list", itemId),
  (itemId) => console.log("adding list", itemId),
);
nav.attachTo(document.querySelector("body"));
