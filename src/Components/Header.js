import React from "react";

function Header({ handleToggleSubTaskInput }) {
    return (
        <div className="d-flex justify-content-end">
            <button
                className="subtask-btn hover:bg-pink-600 duration-300 ease-in-out transition"
                type="button"
                onClick={handleToggleSubTaskInput}
            >
                Add task
            </button>
        </div>
    );
}

export default Header;
