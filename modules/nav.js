import { generateId } from "./utils.js"

/**
 * @typedef {import('./storage.js').List} List
 */

const navStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  overflow: "auto",
}

const itemBtnStyle = {
  display: "block",
  margin: "0.5rem",
  padding: "0.5rem",
}

const removeBtnStyle = {
  backgroundColor: "rgb(255, 175, 175)",
  marginLeft: "1rem",
}

const addingBtnStyle = {
  backgroundColor: "rgb(172, 240, 172)",
  margin: "0.5rem",
}

export default class Nav {
  /**
   * 
   * @param {Array<List>} lists
   * @param {(itemId: string) => void} listItemCallback
   * @param {(itemId: string) => void} removingListCallback
   * @param {(itemId: string) => void} addingListCallback
   */
  constructor(lists, listItemCallback, removingListCallback, addingListCallback) {
    this._nav = document.createElement("nav");
    this._createTasksLists(lists).forEach((list) => {
      this._nav.appendChild(list);
    });
    this._nav.appendChild(this._createAddingButton());
    Object.assign(this._nav.style, navStyle);
    this._listItemClickedCallback = listItemCallback;
    this._removingListCallback = removingListCallback;
    this._addingListCallback = addingListCallback;
  }

  _createAddingButton() {
    const button = document.createElement("button");
    button.textContent = "Add new task";
    Object.assign(button.style, addingBtnStyle);
    button.onclick = () => this._addingListCallback();
    return button;
  };

  /**
   * 
   * @param {string} id 
   * @param {string} label 
   */
  _createItemButton(id, label) {
    const button = document.createElement("button");
    button.textContent = label;
    Object.assign(button.style, itemBtnStyle);
    button.onclick = () => this._listItemClickedCallback(id);
    return button;
  };

  /**
   * 
   * @param {string} id 
   */
  _createRemovingButton(id) {
    const button = document.createElement("button");
    button.textContent = "remove";
    Object.assign(button.style, removeBtnStyle);
    button.onclick = (e) => {
      e.stopPropagation();
      this._removingListCallback(id)
    };
    return button;
  };

  /**
   * 
   * @param {Array<List>} lists 
   */
  _createTasksLists(lists) {
    return lists.map(({id, label}) => {
      const itemBtn = this._createItemButton(id, label);
      const removeBtn = this._createRemovingButton(id);
      itemBtn.appendChild(removeBtn);
      return itemBtn;
    });
  };

  /**
   * 
   * @param {HTMLElement} element 
   */
  attachTo(element) {
    element.appendChild(this._nav);
  }

  /**
   * 
   * @param {string} name 
   */
  detachByEvent(name) {
    window.addEventListener(
      name,
      () => this._nav.parentElement && this._nav.parentElement.removeChild(this._nav),
      false,
    );
  }
}
