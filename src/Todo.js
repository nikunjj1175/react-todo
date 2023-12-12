import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

function Todo() {
    const [allTodos, setAllTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const [newSubTitle, setNewSubTitle] = useState("");
    const [newSubDescription, setNewSubDescription] = useState("");
    const [isEditingSubtask, setIsEditing] = useState(true);
    const [checkedSubItems, setCheckedSubItems] = useState([]);

    const handleAddTodo = () => {
        if (isEditItem !== null) {
            const updatedTodos = allTodos.map((item) =>
                item.id === isEditItem
                    ? {
                        ...item,
                        title: newTitle !== "" ? newTitle : item.title,
                        description: newDescription !== "" ? newDescription : item.description,
                    }
                    : item
            );

            setAllTodos(updatedTodos);
            localStorage.setItem("todoList", JSON.stringify(updatedTodos));

            setNewTitle("");
            setNewDescription("");
            setIsEditItem(null);
            setToggleSubmit(false);
        } else {
            if (newTitle.trim() === "" || newDescription.trim() === "") {
                alert("fill title & description");
                return;
            }
            let newTodoItem = {
                id: new Date().getTime().toString(),
                title: newTitle,
                description: newDescription,
            };

            let updatedTodos = [...allTodos, newTodoItem];
            setAllTodos(updatedTodos);
            localStorage.setItem("todoList", JSON.stringify(updatedTodos));

            setNewTitle("");
            setNewDescription("");
            setToggleSubmit(true);
        }
    };

    const handleToDoEdit = (index) => {
        let newEditItem = allTodos.find((elem) => {
            return elem.id === index;
        });
        console.log("Edit", newEditItem);
        setToggleSubmit(false);
        setNewTitle(newEditItem.title);
        setNewDescription(newEditItem.description);
        setIsEditItem(index);
    };

    const handleAddSubTask = (parentId) => {
        if (newSubTitle.trim() === "" || newSubDescription.trim() === "") {
            alert("fill Subtitle & Description");
            return;
        }
        const updatedTodos = allTodos.map((item) =>
            item.id === parentId
                ? {
                    ...item,
                    subtasks: [
                        ...(item.subtasks || []),
                        {
                            id: new Date().getTime().toString(),
                            title: newSubTitle,
                            description: newSubDescription,
                        },
                    ],
                }
                : item
        );

        setAllTodos(updatedTodos);
        localStorage.setItem("todoList", JSON.stringify(updatedTodos));

        setNewSubTitle("");
        setNewSubDescription("");
        setIsEditing(true)
    };

    const handleToDoSubDelete = (taskIndex, subtaskIndex) => {
        const updatedTodos = allTodos.map((item, index) =>
            index === taskIndex
                ? {
                    ...item,
                    subtasks: item.subtasks.filter((_, i) => i !== subtaskIndex),
                }
                : item
        );

        setAllTodos(updatedTodos);
        localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    };

    const handleToDoSubEdit = (taskIndex, subtaskIndex) => {
        const subtaskToEdit = allTodos[taskIndex].subtasks[subtaskIndex];
        if (subtaskToEdit) {
            setNewSubTitle(subtaskToEdit.title);
            setNewSubDescription(subtaskToEdit.description);

            // Remove the edited subtask from the subtasks array
            const updatedSubtasks = allTodos[taskIndex].subtasks.filter((_, i) => i !== subtaskIndex);

            // Update state with the remaining subtasks
            setAllTodos((prevTodos) => {
                const updatedTodos = [...prevTodos];
                updatedTodos[taskIndex] = {
                    ...updatedTodos[taskIndex],
                    subtasks: updatedSubtasks,
                };
                return updatedTodos;
            });
            setIsEditing(false);

            // Additional logic for handling subtask editing, if needed

            // Save the updated state to local storage
            localStorage.setItem("todoList", JSON.stringify(allTodos));
        }
    };

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem("todoList"));
        if (savedTodo) {
            setAllTodos(savedTodo);
        }
    }, []);

    const handleToDoDelete = (index) => {
        let reducedTodos = [...allTodos];
        reducedTodos.splice(index, 1);
        localStorage.setItem("todoList", JSON.stringify(reducedTodos));
        setAllTodos(reducedTodos);
    };

    const handleToDoSUbmit = (id) => {
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = [...prevCheckedItems];
            newCheckedItems[id] = !newCheckedItems[id];
            return newCheckedItems;
        });
    };

    const handleToDoSubSUbmit = (subtaskIndex) => {
        setCheckedSubItems((prevCheckedItems) => {
            const newSubCheckedItems = [...prevCheckedItems];
            newSubCheckedItems[subtaskIndex] = !newSubCheckedItems[subtaskIndex];
            return newSubCheckedItems;
        });
    };

    return (
        <>
            <h1 className="pt-4">Todo List</h1>
            <div className="todo-wrapper w-50 p-5 mt-4">
                <>
                    <TodoInput
                        newTitle={newTitle}
                        setNewTitle={setNewTitle}
                        newDescription={newDescription}
                        setNewDescription={setNewDescription}
                        toggleSubmit={toggleSubmit}
                        handleAddTodo={handleAddTodo}
                    />
                </>

                {allTodos.map((item, index) => (
                    <TodoItem
                        key={item.id}
                        item={item}
                        index={index}
                        checkedItems={checkedItems}
                        checkedSubItems={checkedSubItems}
                        newSubTitle={newSubTitle}
                        newSubDescription={newSubDescription}
                        setNewSubTitle={setNewSubTitle}
                        setNewSubDescription={setNewSubDescription}
                        handleToDoSUbmit={handleToDoSUbmit}
                        handleToDoSubSUbmit={handleToDoSubSUbmit}
                        handleToDoDelete={handleToDoDelete}
                        handleToDoEdit={handleToDoEdit}
                        handleAddSubTask={handleAddSubTask}
                        handleToDoSubDelete={handleToDoSubDelete}
                        handleToDoSubEdit={handleToDoSubEdit}
                        isEditingSubtask={isEditingSubtask}
                        setIsEditing={setIsEditing}
                    />
                ))}
            </div>
        </>
    );
}

export default Todo;
