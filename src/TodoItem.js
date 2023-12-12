import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";

function TodoItem({
  item,
  index,
  checkedItems,
  checkedSubItems,
  newSubTitle,
  newSubDescription,
  setNewSubTitle,
  setNewSubDescription,
  handleToDoSUbmit,
  handleToDoSubSUbmit,
  handleToDoDelete,
  handleToDoEdit,
  handleAddSubTask,
  handleToDoSubDelete,
  handleToDoSubEdit,
  isEditingSubtask,
  setIsEditing,
}) {
  return (
    <div className="accordion accordion-flush" key={item.id}>
      <div className="todo-list accordion-item">
        <div className="accordion-header">
          <div className="todo-list-item ">
            <div className="d-flex align-items-unset" style={{ gap: "40px" }}>
              <div>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    className="checkbox_design"
                    checked={checkedItems[index] || false}
                    onChange={() => handleToDoSUbmit(index)}
                  />
                  <h3 className={` ${checkedItems[index] ? "checked" : ""}`}>
                    {item.title}
                  </h3>
                </div>
                <h5>{item.description}</h5>
              </div>

              <div>
                <AiOutlineDelete
                  title="Delete?"
                  className="icon"
                  onClick={() => handleToDoDelete(index)}
                />
                <HiOutlinePencil
                  title="Edit?"
                  className="icon"
                  onClick={() => {
                    handleToDoEdit(item.id);
                    setIsEditing(item.title);
                    setIsEditing(item.description);
                  }}
                />
              </div>
            </div>
            <span
              className="accordion-button collapsed"
              style={{
                width: "0",
                paddingRight: "40px",
                backgroundColor: "#353435",
                border: "2px solid #282c34",
              }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse-${item.id}`}
              aria-expanded="false"
              aria-controls={`flush-collapse-${item.id}`}
            ></span>
          </div>
        </div>

        <div
          id={`flush-collapse-${item.id}`}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <div className="todo-list-item">
              <div className="todo-input-item todo-sub-task">
                <label>Sub Title:</label>
                <input
                  type="text"
                  placeholder="What's the title of your Subtask?"
                  value={newSubTitle}
                  onChange={(e) => setNewSubTitle(e.target.value)}
                />
              </div>
              <div className="todo-input-item todo-sub-task">
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="What's the description of your Subtask?"
                  value={newSubDescription}
                  onChange={(e) => setNewSubDescription(e.target.value)}
                />
              </div>
              <button
                className="primary-btn subtask-btn"
                style={{ width: "15%" }}
                type="button"
                onClick={() => handleAddSubTask(item.id)}
              >
                {isEditingSubtask ? "Add Subtask" : "Edit Subtask"}
              </button>
            </div>
            <hr style={{ color: "gray", opacity: "0.5" }} />

            {item.subtasks && (
              <ul className="sub-todo">
                {item.subtasks.map((subtask, subtaskIndex) => (
                  <li
                    key={subtask.id}
                    className="d-flex d-flex align-items-center justify-content-between"
                  >
                    <div>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          className="checkbox_design"
                          checked={checkedSubItems[subtaskIndex] || false}
                          onChange={() => handleToDoSubSUbmit(subtaskIndex)}
                        />
                        <h4
                          style={{ color: "coral" }}
                          className={` ${
                            checkedSubItems[subtaskIndex] ? "checked" : ""
                          }`}
                        >
                          {subtask.title}
                        </h4>
                      </div>
                      <h6
                        style={{
                          color: "#A89EA2",
                          paddingLeft: "32px",
                          fontSize: "12px",
                        }}
                      >
                        {subtask.description}
                      </h6>
                    </div>
                    <div>
                      <AiOutlineDelete
                        title="Delete SubTask?"
                        className="icon"
                        onClick={() => handleToDoSubDelete(index, subtaskIndex)}
                      />
                      <HiOutlinePencil
                        title="Edit SubTask?"
                        className="icon"
                        onClick={() => handleToDoSubEdit(index, subtaskIndex)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
