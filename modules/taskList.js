/**
 * @typedef {{id: string, label: string}} List
 */

/**
 * @typedef {{id: string, label: string, isDone: boolean, parentId: string}} Task
 */

const articleStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const titleStyle = {
  display: "block",
  border: "none",
  fontSize: "2rem",
  textAlign: "center",
}

const tasksStyle = {
  display: "block",
  padding: 0,
}

const taskItemStyle = {
  display: "flex",
  border: "1px solid black",
  margin: "0.5rem",
  padding: "0.5rem",
};

const taskItemIsDoneStyle = {
  textDecoration: "line-through",
};

const taskLabelStyle = {
  display: "block",
  border: "none",
}

const taskRemoveBtnStyle = {
  backgroundColor: "rgb(255, 175, 175)",
  marginLeft: "0.5rem",
}

const taskIsDoneBtnStyle = {
  marginRight: "0.5rem",
}

const addTaskBtnStyle = {
  backgroundColor: "rgb(172, 240, 172)",
  margin: "0.5rem",
}

export default class TaskList {
  /**
   * 
   * @param {List} list
   * @param {Array<Task>} tasks
   * @param {(id: string, value: string) => void} titleChangedCallback
   * @param {(id: string, isChecked: boolean) => void} taskIsDoneChangedCallback
   * @param {(id: string, value: string) => void} taskLabelChangedCallback
   * @param {(id: string) => void} removingTaskCallback
   * @param {() => void} addingTaskCallback
   */
  constructor(
    list,
    tasks,
    titleChangedCallback,
    taskIsDoneChangedCallback,
    taskLabelChangedCallback,
    removingTaskCallback,
    addingTaskCallback,
  ) {
    this._article = document.createElement("article");
    this._article.appendChild(this._createTitle(list));
    this._article.appendChild(this._createTaskCounter(tasks));
    this._article.appendChild(this._createTaskList(tasks));
    this._article.appendChild(this._createAddTaskButton());
    Object.assign(this._article.style, articleStyle);
    this._titleChangedCallback = titleChangedCallback;
    this._taskIsDoneChangedCallback = taskIsDoneChangedCallback;
    this._taskLabelChangedCallback = taskLabelChangedCallback;
    this._removingTaskCallback = removingTaskCallback;
    this._addingTaskCallback = addingTaskCallback;
  }

  /**
   * 
   * @param {List} list 
   */
  _createTitle({id, label}) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = label;
    Object.assign(input.style, titleStyle);
    input.onchange = (e) => this._titleChangedCallback(id, e.target.value);
    return input;
  }

  /**
   * 
   * @param {Array<Task>} tasks 
   */
  _createTaskCounter(tasks) {
    const counter = document.createElement("span");
    counter.textContent = `${tasks.filter((task) => task.isDone).length}/${tasks.length}`;
    return counter;
  }

  /**
   * 
   * @param {Array<Task>} tasks 
   */
  _createTaskList(tasks) {
    const list = document.createElement("ul");
    Object.assign(list.style, tasksStyle);
    tasks.forEach(({id, label, isDone}) => {
      const item = document.createElement("li");
      Object.assign(item.style, taskItemStyle);
      item.appendChild(this._createTaskIsDoneButton(id, isDone));
      item.appendChild(this._createTaskLabel(id, label, isDone));
      item.appendChild(this._createRemoveTaskButton(id));
      list.appendChild(item);
    });
    return list;
  }

  /**
   * 
   * @param {string} taskId 
   * @param {boolean} isDone 
   */
  _createTaskIsDoneButton(taskId, isDone) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = isDone;
    Object.assign(input.style, taskIsDoneBtnStyle);
    input.onchange = (e) => this._taskIsDoneChangedCallback(taskId, e.target.checked);
    return input;
  }

  /**
   * 
   * @param {string} taskId 
   * @param {string} label 
   * @param {boolean} isDone 
   */
  _createTaskLabel(taskId, label, isDone) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = label;
    Object.assign(input.style, taskLabelStyle);
    if (isDone) {
      Object.assign(input.style, taskItemIsDoneStyle);
    }
    input.onchange = (e) => this._taskLabelChangedCallback(taskId, e.target.value);
    return input;
  }

  /**
   * 
   * @param {string} taskId 
   */
  _createRemoveTaskButton(taskId) {
    const button = document.createElement("button");
    button.textContent = "remove";
    Object.assign(button.style, taskRemoveBtnStyle);
    button.onclick = () => this._removingTaskCallback(taskId);
    return button;
  }

  _createAddTaskButton() {
    const button = document.createElement("button");
    button.textContent = "Add new task";
    Object.assign(button.style, addTaskBtnStyle);
    button.onclick = () => this._addingTaskCallback();
    return button;
  }

  /**
   * 
   * @param {HTMLElement} element 
   */
  attachTo(element) {
    if (this._elementToAttachTo) {
      this._elementToAttachTo.removeChild(this._article);
    }
    this._elementToAttachTo = element;
    element.appendChild(this._article);
  }
}
