import React from "react";

function SortOptions({ sortCriterion, sortOrder, handleSortCriterionChange, handleSortOrderChange, sortTodo }) {
    return (
        <div className="d-flex todo-input-item flex-row gap-2 justify-center align-items-center">
            <select
                className="select-box1"
                value={sortCriterion}
                onChange={(e) => handleSortCriterionChange(e.target.value)}
            >
                <option value="Title">Title</option>
                <option value="Date">Date</option>
            </select>

            <select
                className="select-box1"
                value={sortOrder}
                onChange={(e) => {
                    handleSortOrderChange(e.target.value);
                    sortTodo();
                }}
            >
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
        </div>
    );
}

export default SortOptions;
