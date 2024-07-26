/**
 * @typedef {WindowSessionStorage["sessionStorage"] | WindowLocalStorage["localStorage"]} Storage
 */

/**
 * @typedef {{id: string, label: string}} List
 */

/**
 * @typedef {{id: string, label: string, isDone: boolean, parentId: string}} Task
 */

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

export const DEFAULT_TASK_LIST_ID = "ida78779c8fe4d6";

export const storage = sessionStorage;

export const fillStorageWithInitialData = () => {
  INITIAL_DATA.forEach((data) => {
    storage.setItem(data.id, JSON.stringify(data));
  });
};

/**
 * 
 * @param {string} id
 * @returns {List | Task}
 */
export const getItemById = (id) => {
  return JSON.parse(storage.getItem(id));
};

/**
 * 
 * @param {string} id
 * @returns {Array<Task>}
 */
export const getTasksByParentIdFromStorage = (id) => {
  const tasks = [];
  const keys = Object.keys(storage);
  for(const key of keys) {
    const value = JSON.parse(storage.getItem(key));
    value.parentId === id && tasks.push(value);
  }
  return tasks;
};

/**
 * 
 * @returns {Array<List>}
 */
export const getAllListsFromStorage = () => {
  const lists = [];
  const keys = Object.keys(storage);
  for(const key of keys) {
    const value = JSON.parse(storage.getItem(key));
    value.id && !value.parentId && lists.push(value);
  }
  return lists;
};
