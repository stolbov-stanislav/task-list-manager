import Nav from "./modules/nav.js";
import TaskList from "./modules/taskList.js";
import {
  storage,
  DEFAULT_TASK_LIST_ID,
  fillStorageWithInitialData,
  getItemById,
  getAllListsFromStorage,
  getTasksByParentIdFromStorage,
} from "./modules/storage.js";
import { onTitleChanged, rerenderEventType } from "./modules/handlers.js";

fillStorageWithInitialData();

/**
 * 
 * @param {string} listId 
 */
const renderTaskListManager = (listId) => {
  const nav = new Nav(
    getAllListsFromStorage(),
    (id) => console.log("list item clicked", id),
    (id) => console.log("removing list", id),
    (id) => console.log("adding list", id),
  );
  nav.attachTo(document.querySelector("body"));
  nav.detachByEvent(rerenderEventType);
  
  const taskList = new TaskList(
    getItemById(listId),
    getTasksByParentIdFromStorage(listId),

    (id, value) => onTitleChanged(id, value, storage, () => renderTaskListManager(listId)),

    (id, isChecked) => console.log("isDone changed", id, isChecked),
    (id, value) => console.log("task label changed", id, value),
    (id) => console.log("removing task", id),
    () => console.log("adding task"),
  );
  taskList.attachTo(document.querySelector("body"));
  taskList.detachByEvent(rerenderEventType);
};

renderTaskListManager(DEFAULT_TASK_LIST_ID);
