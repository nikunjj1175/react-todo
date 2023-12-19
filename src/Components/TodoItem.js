import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";

function TodoItem({
    item,
    index,
    checkedItems,
    hoveredItem,
    isEditItem,
    editedTitle,
    editedDescription,
    handleHover,
    handleToDoSUbmit,
    handleToDoDelete,
    handleToDoEdit,
    handleSaveEdit,
    setEditedTitle,
    setEditedDescription,
}) {
    return (
        <div className="accordion accordion-flush" key={item.id}>
            <div className="accordion-header">
                <div
                    className="todo-list-item sub-task"
                    key={index}
                    onMouseEnter={() => handleHover(item.id)}
                    onMouseLeave={() => handleHover(null)}
                >
                    <div
                        className="d-flex align-items-unset"
                        style={{ gap: "40px" }}
                    >
                        <div className="todo-item-container">
                            {isEditItem === item.id ? (
                                <>
                                    <div
                                        className="d-flex flex-column"
                                        style={{ fontSize: "15px" }}
                                    >
                                        <input
                                            type="text"
                                            value={editedTitle}
                                            style={{ "border": "1px solid black" }}
                                            onChange={(e) =>
                                                setEditedTitle(e.target.value)
                                            }
                                        />
                                        <textarea
                                            rows="1"
                                            style={{ "border": "1px solid black" }}
                                            value={editedDescription}
                                            onChange={(e) =>
                                                setEditedDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSaveEdit(item.id)}
                                        className="mt-2 primary-btn"
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
                                            checked={checkedItems[index] || false}
                                            onChange={() => handleToDoSUbmit(index)}
                                        />
                                        <h4
                                            className={` ${checkedItems[index] ? "checked" : ""
                                                }`}
                                        >
                                            {item.title}
                                        </h4>
                                    </div>
                                    <h5>{item.description}</h5>
                                </>
                            )}
                        </div>


                    </div>
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <p className="timestamp m-0">Created at: {item.createdAt}</p>
                        </div>
                        <span
                            className="accordion-button collapsed hover:text-pink-600 duration-300 ease-in-out transition"
                            style={{
                                width: "0",
                                paddingTop: "10px",
                                paddingRight: "40px",
                            }}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse-${item.id}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapse-${item.id}`}
                        ></span>{" "}
                        <div>
                            {hoveredItem === item.id && (
                                <div className="d-flex">
                                    <AiOutlineDelete
                                        title="Delete?"
                                        className="icon hover:text-pink-600 duration-300 ease-in-out transition"
                                        onClick={() => handleToDoDelete(index)}
                                    />
                                    {isEditItem !== item.id && (
                                        <HiOutlinePencil
                                            title="Edit?"
                                            className="icon hover:text-pink-600 duration-300 ease-in-out transition"
                                            onClick={() => handleToDoEdit(item.id)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
