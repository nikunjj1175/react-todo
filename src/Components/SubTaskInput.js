import React from "react";

function SubTaskInput({
    newSubTitle,
    newSubDescription,
    handleAddSubTask,
    setNewSubTitle,
    setNewSubDescription,
    item,   
}) {
    return (
        <div className="todo-list-item">
            <div className="todo-input-item todo-sub-task">
                <input
                    type="text"
                    placeholder="Subtask Title"
                    value={newSubTitle}
                    onChange={(e) =>
                        setNewSubTitle(e.target.value)
                    }
                />
            </div>
            <div className="todo-input-item todo-sub-task">
                <textarea
                    rows="1"
                    placeholder="Subtask Description"
                    value={newSubDescription}
                    onChange={(e) =>
                        setNewSubDescription(e.target.value)
                    }
                />
            </div>
            <button
                className="primary-btn hover:bg-pink-600 duration-300 ease-in-out transition"
                style={{ width: "70px" }}
                type="button"
                onClick={() => handleAddSubTask(item.id)}
            >
                Add
            </button>
        </div>
    );
}

export default SubTaskInput;
