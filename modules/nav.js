import { generateId } from "./utils.js"

const navStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const itemBtnStyle = {
  display: "block",
  margin: "0.5rem",
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
  _nav = document.createElement("nav");
  /** @type {HTMLElement | null} */
  _elementToAttachTo = null;
  /** @type {null | (itemId: string) => void} */
  _listItemClickedCallback = null;
  /** @type {null | (itemId: string) => void} */
  _removingListCallback = null;
  /** @type {null | (itemId: string) => void} */
  _addingListCallback = null;

  /**
   * 
   * @param {Array<{id: number, title: string}>} data
   * @param {(itemId: string) => void} listItemCallback
   * @param {(itemId: string) => void} removingListCallback
   * @param {(itemId: string) => void} addingListCallback
   */
  constructor(data, listItemCallback, removingListCallback, addingListCallback) {
    this._createTasksLists(data).forEach((list) => {
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
    button.textContent = "Create task list";
    Object.assign(button.style, addingBtnStyle);
    button.onclick = () => {
      const itemBtn = this._createItemButton("New list");
      const id = generateId();
      itemBtn.onclick = () => {
        if (this._listItemClickedCallback) {
          this._listItemClickedCallback(id);
        }
      };
      const removeBtn = this._createRemovingButton();
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        this._nav.removeChild(itemBtn);
        if (this._removingListCallback) {
          this._removingListCallback(id);
        }
      };
      itemBtn.appendChild(removeBtn);
      button.before(itemBtn);
      if (this._addingListCallback) {
        this._addingListCallback(id);
      }
    };
    return button;
  };

  /**
   * 
   * @param {string} title 
   */
  _createItemButton(title) {
    const button = document.createElement("button");
    button.textContent = title;
    Object.assign(button.style, itemBtnStyle);
    return button;
  };

  _createRemovingButton() {
    const button = document.createElement("button");
    button.textContent = "remove";
    Object.assign(button.style, removeBtnStyle);
    return button;
  };

  /**
   * 
   * @param {Array<{id: number, title: string}>} data 
   */
  _createTasksLists(data) {
    return data.map((list) => {
      const itemBtn = this._createItemButton(list.title);
      itemBtn.onclick = () => {
        if (this._listItemClickedCallback) {
          this._listItemClickedCallback(list.id);
        }
      };
      const removeBtn = this._createRemovingButton();
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        this._nav.removeChild(itemBtn);
        if (this._removingListCallback) {
          this._removingListCallback(list.id);
        }
      };
      itemBtn.appendChild(removeBtn);
      return itemBtn;
    });
  };

  /**
   * 
   * @param {HTMLElement} element 
   */
  attachTo(element) {
    if (this._elementToAttachTo) {
      this._elementToAttachTo.removeChild(this._nav);
    }
    this._elementToAttachTo = element;
    element.appendChild(this._nav);
  }
}
