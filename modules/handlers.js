/**
 * @typedef {import('./storage.js').Storage} Storage
 */

import { removeAllTasksFromStorageByParentId } from './storage.js';
import { generateId } from './utils.js';

const rerenderEvent = new Event("rerender");
export const rerenderEventType = rerenderEvent.type;

/**
 * 
 * @param {string} id 
 * @param {string} value 
 * @param {Storage} storage 
 * @param {() => void} callback 
 */
export const onTitleChanged = (id, value, storage, callback) => {
  const list = JSON.parse(storage.getItem(id));
  list.label = value;
  storage.setItem(id, JSON.stringify(list));
  window.dispatchEvent(rerenderEvent);
  callback();
};

/**
 * 
 * @param {string} id 
 * @param {boolean} isChecked 
 * @param {Storage} storage 
 * @param {() => void} callback 
 */
export const onIsDoneChanged = (id, isChecked, storage, callback) => {
  const task = JSON.parse(storage.getItem(id));
  task.isDone = isChecked;
  storage.setItem(id, JSON.stringify(task));
  window.dispatchEvent(rerenderEvent);
  callback();
};

/**
 * 
 * @param {string} id 
 * @param {string} value 
 * @param {Storage} storage 
 * @param {() => void} callback 
 */
export const onTaskLabelChanged = (id, value, storage, callback) => {
  const task = JSON.parse(storage.getItem(id));
  task.label = value;
  storage.setItem(id, JSON.stringify(task));
  window.dispatchEvent(rerenderEvent);
  callback();
};

/**
 * 
 * @param {string} id 
 * @param {Storage} storage 
 * @param {() => void} callback 
 */
export const onTaskRemoved = (id, storage, callback) => {
  storage.removeItem(id);
  window.dispatchEvent(rerenderEvent);
  callback();
};

/**
 * 
 * @param {string} parentId 
 * @param {Storage} storage 
 * @param {() => void} callback 
 */
export const onTaskAdded = (parentId, storage, callback) => {
  const id = generateId();
  storage.setItem(id, JSON.stringify({
    id,
    label: "New task",
    isDone: false,
    parentId,
  }));
  window.dispatchEvent(rerenderEvent);
  callback();
};

/**
 * 
 * @param {() => void} callback 
 */
export const onListClicked = (callback) => {
  window.dispatchEvent(rerenderEvent);
  callback();
};

/**
 * 
 * @param {string} id 
 * @param {Storage} storage 
 * @param {() => void} callback 
 */
export const onListRemoved = (id, storage, callback) => {
  storage.removeItem(id);
  removeAllTasksFromStorageByParentId(id);
  window.dispatchEvent(rerenderEvent);
  callback();
};

/**
 * 
 * @param {Storage} storage 
 * @param {() => void} callback 
 */
export const onListAdded = (storage, callback) => {
  const id = generateId();
  storage.setItem(id, JSON.stringify({
    id,
    label: "New list",
  }));
  window.dispatchEvent(rerenderEvent);
  callback();
};
