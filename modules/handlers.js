/**
 * @typedef {import('./modules/storage.js').Storage} Storage
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
