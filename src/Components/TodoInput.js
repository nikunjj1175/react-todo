import React from "react";

function TodoInput({
    newTitle,
    newDescription,
    handleTitleChange,
    handleDescriptionChange,
    handleAddTodo,
}) {
    return (
        <div className="todo-inputbox d-flex align-items-center">
            <div className="todo-input-item">
                {/* <label>Title:</label> */}
                <input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                />
            </div>
            <div className="todo-input-item">
                {/* <label>Description:</label> */}
                <textarea
                    rows="1"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                />
            </div>
            <div className="todo-input-item">
                <button
                    className="primary-btn hover:bg-pink-600 duration-300 ease-in-out transition"
                    type="button"
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default TodoInput;
