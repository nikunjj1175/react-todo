import React from "react";

function TodoInput({
    newTitle,
    setNewTitle,
    newDescription,
    setNewDescription,
    toggleSubmit,
    handleAddTodo,
}) {
    return (
        <>
            <div className="todo-input d-flex align-items-center justify-content-between g-5 pb-4 mb-4">
                <div className="todo-input-item">
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="What's the title of your To Do?"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </div>
                <div className="todo-input-item">
                    <label>Description:</label>
                    <input
                        type="text"
                        placeholder="What's the description of your To Do?"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </div>
                <button
                    className="primary-btn"
                    type="button"
                    onClick={handleAddTodo}
                >
                    {toggleSubmit ? "Add" : "Edit"}
                </button>
            </div>
        </>
    );
}

export default TodoInput;