import Nav from "./modules/nav.js";
import TaskList from "./modules/taskList.js";

const INITIAL_DATA = [
  {
    id: "ida78779c8fe4d6",
    label: "CardView",
  },
  {
    id: "ida89779c8fe4d5",
    label: "Refactoring",
  },
  {
    id: "ida78879c8fe4d6",
    label: "Discuss requirements",
    isDone: true,
    parentId: "ida78779c8fe4d6",
  },
  {
    id: "ida78779d8fe4d4",
    label: "Implement server side",
    isDone: false,
    parentId: "ida78779c8fe4d6",
  },
  {
    id: "ida78779c8fe5d7",
    label: "Styles",
    isDone: false,
    parentId: "ida89779c8fe4d5",
  },
  {
    id: "ida75679c8fe4d3",
    label: "Scripts via modules",
    isDone: true,
    parentId: "ida89779c8fe4d5",
  },
];

const DEFAULT_TASK_LIST_ID = "ida78779c8fe4d6";

const renderTaskListManager = () => {
  const nav = new Nav(
    INITIAL_DATA.filter((data) => !data.parentId),
    (id) => console.log("list item clicked", id),
    (id) => console.log("removing list", id),
    (id) => console.log("adding list", id),
  );
  nav.attachTo(document.querySelector("body"));
  
  const taskList = new TaskList(
    INITIAL_DATA.find((data) => data.id === DEFAULT_TASK_LIST_ID),
    INITIAL_DATA.filter((data) => data.parentId === DEFAULT_TASK_LIST_ID),
    (id, value) => console.log("title changed", id, value),
    (id, isChecked) => console.log("isDone changed", id, isChecked),
    (id, value) => console.log("task label changed", id, value),
    (id) => console.log("removing task", id),
    () => console.log("adding task"),
  );
  taskList.attachTo(document.querySelector("body"));
};

renderTaskListManager();
