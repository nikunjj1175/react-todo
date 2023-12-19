import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";

function SubTask({
    subtask,
    subtaskIndex,
    checkedSubItems,
    hoveredSubtaskId,
    isEditingSubtask,
    editedSubTitle,
    editedSubDescription,
    handleHoverSubtask,
    handleToDoSubSUbmit,
    handleToDoSubDelete,
    handleToDoSubEdit,
    setEditedSubTitle,
    setEditedSubDescription,
    handleSaveEditSubtask,
    index,
}) {
    return (
        <li
            key={subtask.id}
            className="d-flex d-flex align-items-center justify-content-between"
            onMouseEnter={() => handleHoverSubtask(subtask.id)}
            onMouseLeave={() => handleHoverSubtask(null)}
        >
            <div className="d-flex align-items-center" style={{ "gap": "620px" }} >
                <div>
                    {isEditingSubtask === subtaskIndex ? (
                        <>
                            <div
                                className="d-flex flex-column"
                                style={{ fontSize: "15px" }}
                            >
                                <input
                                    type="text"
                                    value={editedSubTitle}
                                    style={{ "border": "1px solid black" }}
                                    onChange={(e) =>
                                        setEditedSubTitle(
                                            e.target.value
                                        )
                                    }
                                />
                                <textarea
                                    rows="1"
                                    style={{ "border": "1px solid black" }}
                                    value={editedSubDescription}
                                    onChange={(e) =>
                                        setEditedSubDescription(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <button
                                onClick={() =>
                                    handleSaveEditSubtask(
                                        index,
                                        subtaskIndex
                                    )
                                }
                                className="mt-2 mb-3 primary-btn"
                            >
                                Edit
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="d-flex">
                                <input
                                    type="checkbox"
                                    className="checkbox_design accent-pink-500"
                                    checked={
                                        checkedSubItems[subtaskIndex] ||
                                        false
                                    }
                                    onChange={() =>
                                        handleToDoSubSUbmit(
                                            subtaskIndex
                                        )
                                    }
                                />
                                <h4
                                    style={{ color: "coral" }}
                                    className={` ${checkedSubItems[subtaskIndex]
                                        ? "checked"
                                        : ""
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
                        </>
                    )}
                </div>
                <div className="d-flex">
                    <p className="timestamp m-0">Created at: {subtask.createdAt}</p>
                </div>
            </div>
            <div className="d-flex">
                <AiOutlineDelete
                    title="Delete SubTask?"
                    className={`icon hover:text-pink-600 duration-300 ease-in-out transition ${hoveredSubtaskId === subtask.id
                        ? ""
                        : "hidden"
                        }`}
                    onClick={() =>
                        handleToDoSubDelete(
                            index,
                            subtaskIndex
                        )
                    }
                />
                <HiOutlinePencil
                    title="Edit SubTask?"
                    className={`hover:text-pink-600 duration-300 ease-in-out transition icon ${hoveredSubtaskId === subtask.id &&
                        isEditingSubtask !== subtask.id
                        ? ""
                        : "hidden"
                        }`}
                    onClick={() =>
                        handleToDoSubEdit(index, subtaskIndex)
                    }
                />
            </div>
        </li>
    );
}

export default SubTask;
