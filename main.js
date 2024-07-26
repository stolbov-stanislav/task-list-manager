import Nav from "./modules/nav.js";
import TaskList from "./modules/taskList.js";
import {
  storage,
  DEFAULT_TASK_LIST_ID,
  fillStorageWithInitialData,
  getItemById,
  getAllListsFromStorage,
  getTasksByParentIdFromStorage,
  getRandomListIdFromStorage,
} from "./modules/storage.js";
import {
  rerenderEventType,
  onTitleChanged,
  onIsDoneChanged,
  onTaskLabelChanged,
  onTaskRemoved,
  onTaskAdded,
  onListClicked,
  onListRemoved,
} from "./modules/handlers.js";

fillStorageWithInitialData();

/**
 * 
 * @param {string} listId 
 */
const renderTaskListManager = (listId) => {
  const nav = new Nav(
    getAllListsFromStorage(),
    (id) => onListClicked(() => renderTaskListManager(id)),
    (id) => onListRemoved(
      id,
      storage,
      () => renderTaskListManager(id === listId ? getRandomListIdFromStorage() : listId),
    ),
    (id) => console.log("adding list", id),
  );
  nav.attachTo(document.querySelector("body"));
  nav.detachByEvent(rerenderEventType);
  
  const taskList = new TaskList(
    getItemById(listId),
    getTasksByParentIdFromStorage(listId),
    (id, value) => onTitleChanged(id, value, storage, () => renderTaskListManager(listId)),
    (id, isChecked) => onIsDoneChanged(id, isChecked, storage, () => renderTaskListManager(listId)),
    (id, value) => onTaskLabelChanged(id, value, storage, () => renderTaskListManager(listId)),
    (id) => onTaskRemoved(id, storage, () => renderTaskListManager(listId)),
    () => onTaskAdded(listId, storage, () => renderTaskListManager(listId)),
  );
  taskList.attachTo(document.querySelector("body"));
  taskList.detachByEvent(rerenderEventType);
};

renderTaskListManager(DEFAULT_TASK_LIST_ID);
