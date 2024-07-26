/**
 * @typedef {import('./storage.js').Storage} Storage
 */

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
