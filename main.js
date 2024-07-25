import Nav from "./modules/nav.js";
import TaskList from "./modules/taskList.js";

const MOCK_DATA = [
  {
    id: "ida78779c8fe4d6",
    title: "CardView",
    tasks: [
      {
        id: "ida78879c8fe4d6",
        isDone: true,
        label: "Discuss requirements",
      },
      {
        id: "ida78779d8fe4d4",
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
        id: "ida78779c8fe5d7",
        isDone: false,
        label: "Styles",
      },
      {
        id: "ida75679c8fe4d3",
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

const taskList = new TaskList(
  MOCK_DATA[0],
  (itemId, value) => console.log("title changed", itemId, value),
  (taskId, isChecked) => console.log("isDone changed", taskId, isChecked),
  (taskId, value) => console.log("task label changed", taskId, value),
  (taskId) => console.log("removing task", taskId),
  () => console.log("adding task"),
);
taskList.attachTo(document.querySelector("body"));
