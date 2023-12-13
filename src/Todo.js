import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";

function Todo() {
	const [allTodos, setAllTodos] = useState([]);
	const [newTitle, setNewTitle] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [checkedItems, setCheckedItems] = useState([]);
	const [newSubTitle, setNewSubTitle] = useState("");
	const [newSubDescription, setNewSubDescription] = useState("");
	const [checkedSubItems, setCheckedSubItems] = useState([]);

	const [editedTitle, setEditedTitle] = useState("");
	const [editedDescription, setEditedDescription] = useState("");
	const [editedSubTitle, setEditedSubTitle] = useState("");
	const [editedSubDescription, setEditedSubDescription] = useState("");
	const [isEditItem, setIsEditItem] = useState(null);
	const [isEditingSubtask, setIsEditingSubtask] = useState(null);
	const [showSubTaskInput, setShowSubTaskInput] = useState(false);
	const [hoveredItem, setHoveredItem] = useState(null);
	const [hoveredSubtaskId, setHoveredSubtaskId] = useState(null);
	const [searchQuery, setSearchQuery] = useState(""); // New state for search
	const [filteredTodos, setFilteredTodos] = useState([]);

	const handleAddTodo = () => {
		let newTodoItem = {
			id: new Date().getTime().toString(),
			title: newTitle,
			description: newDescription,
			subtasks: [],
			searchTitle: newTitle.toLowerCase(),
		};

		let updatedTodos = [...allTodos, newTodoItem];
		setAllTodos(updatedTodos);
		setFilteredTodos(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));

		setNewTitle("");
		setNewDescription("");
	};

	const handleToDoEdit = (id) => {
		setIsEditItem(id);
		const editedItem = allTodos.find((item) => item.id === id);
		setEditedTitle(editedItem.title);
		setEditedDescription(editedItem.description);
	};

	const handleSaveEdit = (id) => {
		const updatedTodos = allTodos.map((item) =>
			item.id === id
				? {
					...item,
					title: editedTitle,
					description: editedDescription,
				}
				: item
		);

		setAllTodos(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));

		setEditedTitle("");
		setEditedDescription("");
		setIsEditItem(null);
	};

	const handleToDoSubEdit = (taskIndex, subtaskIndex) => {
		setIsEditingSubtask(subtaskIndex);
		const editedSubtask = allTodos[taskIndex].subtasks[subtaskIndex];
		setEditedSubTitle(editedSubtask.title);
		setEditedSubDescription(editedSubtask.description);
	};

	const handleSaveEditSubtask = (taskIndex, subtaskIndex) => {
		const updatedTodos = allTodos.map((item, index) =>
			index === taskIndex
				? {
					...item,
					subtasks: item.subtasks.map((subtask, i) =>
						i === subtaskIndex
							? {
								...subtask,
								title: editedSubTitle,
								description: editedSubDescription,
							}
							: subtask
					),
				}
				: item
		);

		setAllTodos(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));

		setEditedSubTitle("");
		setEditedSubDescription("");
		setIsEditingSubtask(null);
	};

	const handleAddSubTask = (parentId) => {
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
		setShowSubTaskInput(false);
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

	useEffect(() => {
		let savedTodo = JSON.parse(localStorage.getItem("todoList"));
		if (savedTodo) {
			setAllTodos(savedTodo);
			setFilteredTodos(savedTodo);
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

	const handleToggleSubTaskInput = () => {
		setShowSubTaskInput(!showSubTaskInput);
	};

	const handleHover = (itemId) => {
		setHoveredItem(itemId);
	};

	const handleHoverSubtask = (subtaskId) => {
		setHoveredSubtaskId(subtaskId);
	};

	const filterTodos = () => {
		const lowerCaseQuery = searchQuery.toLowerCase();
		const filtered = allTodos.filter((todo) =>
			todo.searchTitle.includes(lowerCaseQuery)
		);
		setFilteredTodos(filtered);
	};

	return (
		<>
			<h1 className="pt-4 text-3xl font-bold">Todo List</h1>
			<div className="container">
				<div className="p-11">
					<div className=" ml-7 pb-4 mb-4 header d-flex flex-column align-items-center gap-10">
						<div className="d-flex todo-inputbox">
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
								<textarea
									rows="1"
									placeholder="What's the description of your To Do?"
									value={newDescription}
									onChange={(e) => setNewDescription(e.target.value)}
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
						<div className="todo-input-item flex-row gap-2 justify-center">
							{/* <label>Search:</label> */}
							<input
								type="text"
								placeholder="Search...."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button
								className="primary-btn mt-0"
								onClick={filterTodos}
								type="button"
							>
								Search
							</button>
						</div>
					</div>

					<div className="todo-body scrollbar" id="style-3">
						{filteredTodos.map((item, index) => {
							return (
								<div
									className="accordion accordion-flush force-overflow"
									key={item.id}
								>
									<div className="todo-list accordion-item">
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
																		onChange={(e) =>
																			setEditedTitle(e.target.value)
																		}
																	/>
																	<textarea
																		rows="1"
																		value={editedDescription}
																		onChange={(e) =>
																			setEditedDescription(e.target.value)
																		}
																	/>
																</div>
																<button
																	onClick={() => handleSaveEdit(item.id)}
																	style={{ border: "none" }}
																	className="mt-2 bg-white btn"
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
																	<h3
																		className={` ${checkedItems[index] ? "checked" : ""
																			}`}
																	>
																		{item.title}
																	</h3>
																</div>
																<h5>{item.description}</h5>
															</>
														)}
													</div>

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
												<span
													className="accordion-button collapsed hover:text-pink-600 duration-300 ease-in-out transition"
													style={{
														width: "0",
														paddingTop: "10px",
														paddingRight: "40px",
														backgroundColor: "#353435",
														border: "2px solid #282c34",
													}}
													type="button"
													data-bs-toggle="collapse"
													data-bs-target={`#flush-collapse-${item.id}`}
													aria-expanded="false"
													aria-controls={`flush-collapse-${item.id}`}
												></span>{" "}
											</div>
										</div>

										<div
											id={`flush-collapse-${item.id}`}
											className="accordion-collapse collapse"
											data-bs-parent="#accordionFlushExample"
										>
											<div className="accordion-body">
												<div className="d-flex justify-content-end">
													<button
														className="subtask-btn hover:bg-pink-600 duration-300 ease-in-out transition"
														type="button"
														onClick={() => handleToggleSubTaskInput()}
													>
														Add task
													</button>
												</div>
												{showSubTaskInput && (
													<>
														<div className="todo-list-item">
															<div className="todo-input-item todo-sub-task">
																<label>Sub Title:</label>
																<input
																	type="text"
																	placeholder="What's the title of your Subtask?"
																	value={newSubTitle}
																	onChange={(e) =>
																		setNewSubTitle(e.target.value)
																	}
																/>
															</div>
															<div className="todo-input-item todo-sub-task">
																<label>Description:</label>
																<textarea
																	rows="1"
																	placeholder="What's the description of your Subtask?"
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
													</>
												)}
												<hr style={{ color: "gray", opacity: "0.5" }} />

												{isEditItem !== item.id ? (
													<>
														{item.subtasks && (
															<ul className="sub-todo">
																{item.subtasks.map((subtask, subtaskIndex) => (
																	<li
																		key={subtask.id}
																		className="d-flex d-flex align-items-center justify-content-between"
																		onMouseEnter={() =>
																			handleHoverSubtask(subtask.id)
																		}
																		onMouseLeave={() =>
																			handleHoverSubtask(null)
																		}
																	>
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
																							onChange={(e) =>
																								setEditedSubTitle(
																									e.target.value
																								)
																							}
																						/>
																						<textarea
																							rows="1"
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
																						style={{ border: "none" }}
																						className="mt-2 mb-3 bg-white btn"
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
																))}
															</ul>
														)}
													</>
												) : null}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default Todo;
