import React, { useEffect, useState, useCallback, } from "react";
import TodoInput from "./Components/TodoInput";
import SearchBar from "./Components/SearchBar";
import SortOptions from "./Components/SortOptions";
import DateFilter from "./Components/DateFilter";
import SubTask from "./Components/SubTask";
import Header from "./Components/Header";
import SubTaskInput from "./Components/SubTaskInput";
import TodoItem from "./Components/TodoItem";
import Header1 from "./Header1";

function Todo() {
	const [allTodos, setAllTodos] = useState([]);
	const [idCounter, setIdCounter] = useState(1);
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
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [sortCriterion, setSortCriterion] = useState("Title");
	const [sortOrder, setSortOrder] = useState("az");
	const [draggedIndex, setDraggedIndex] = useState(null);

	const formatDate = (date) => {
		const day = date.getDate().toString().padStart(2, "0");
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear().toString();
		return `${day} ${month}, ${year}`;
	};

	const handleAddTodo = () => {
		const currentDate = new Date();
		const formattedDate = formatDate(currentDate);

		let newTodoItem = {
			id: idCounter,
			title: newTitle,
			description: newDescription,
			subtasks: [],
			createdAt: formattedDate,
		};

		setIdCounter((prevCounter) => prevCounter + 1);

		const updatedTodos = [...allTodos, newTodoItem];
		setAllTodos(updatedTodos);
		setSearchResults(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));

		setNewTitle("");
		setNewDescription("");
	};

	const handleToDoDelete = (index) => {
		let reducedTodos = [...allTodos];
		reducedTodos.splice(index, 1);
		setAllTodos(reducedTodos);
		localStorage.setItem("todoList", JSON.stringify(reducedTodos));
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
					updatedAt: new Date().toLocaleString(),
				}
				: item
		);

		setSearchResults(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));

		setEditedTitle("");
		setEditedDescription("");
		setIsEditItem(null);
	};

	const handleAddSubTask = (parentId) => {
		const currentDate = new Date();
		const formattedDate = formatDate(currentDate);
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
							createdAt: formattedDate,
						},
					],
					updatedAt: new Date().toLocaleString(),
				}
				: item
		);

		setSearchResults(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));

		setNewSubTitle("");
		setNewSubDescription("");
		setShowSubTaskInput(false);
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
								updatedAt: new Date().toLocaleString(),
							}
							: subtask
					),
					updatedAt: new Date().toLocaleString(),
				}
				: item
		);

		setSearchResults(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));

		setEditedSubTitle("");
		setEditedSubDescription("");
		setIsEditingSubtask(null);
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

		setSearchResults(updatedTodos);
		localStorage.setItem("todoList", JSON.stringify(updatedTodos));
	};

	useEffect(() => {
		let savedTodo = JSON.parse(localStorage.getItem("todoList"));
		if (savedTodo) {
			setAllTodos(savedTodo);
			setSearchResults(savedTodo);
		}
	}, []);

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

	const handleSearch = (query) => {
		const lowerCaseQuery = query.toLowerCase();
		const filtered = allTodos.filter((todo) =>
			todo.title.includes(lowerCaseQuery)
		);
		setSearchResults(filtered);
	};

	const sortTodo = () => {
		const lowerCaseQuery = searchQuery.toLowerCase();
		let filtered = allTodos.filter((todo) =>
			todo.title.includes(lowerCaseQuery)
		);

		if (sortCriterion === "Title") {
			filtered = filtered.sort((a, b) =>
				sortOrder === "az"
					? b.title.localeCompare(a.title)
					: a.title.localeCompare(b.title)
			);
		} else if (sortCriterion === "Date") {
			filtered = filtered.sort((a, b) => {
				const dateA = new Date(a.createdAt);
				const dateB = new Date(b.createdAt);
				return sortOrder === "az" ? dateB - dateA : dateA - dateB;
			});
		}

		setSearchResults(filtered);
	};

	const handleDateChange = (date, type) => {
		if (type === "start") {
			setStartDate(date);
		} else {
			setEndDate(date);
		}
	};

	const filterByDate = useCallback(() => {
		const startDateTime = startDate ? new Date(startDate).getTime() : null;
		const endDateTime = endDate ? new Date(endDate).getTime() : null;

		const filtered = allTodos.filter((todo) => {
			const todoDateTime = new Date(todo.createdAt).getTime();
			return (
				(!startDateTime || todoDateTime >= startDateTime) &&
				(!endDateTime || todoDateTime <= endDateTime)
			);
		});

		setSearchResults(filtered);
	}, [startDate, endDate, allTodos]);

	useEffect(() => {
		filterByDate();
	}, [filterByDate]);

	const handleDragStart = (index) => {
		setDraggedIndex(index);
	};

	const handleDragOver = (index) => {
		if (index !== draggedIndex) {
			let allTodosCopy = [...allTodos];
			const draggedItemContent = allTodosCopy.splice(draggedIndex, 1)[0];
			allTodosCopy.splice(index, 0, draggedItemContent);
			setDraggedIndex(index);
			setAllTodos(allTodosCopy);
		}
	};

	const handleDragEnd = () => {
		setDraggedIndex(null);
	};

	return (
		<>
			<Header1 />
			<div className="container">
				<h4 className="pt-2 m-0 pb-2">TodoList</h4>
				<div
					className="header d-flex flex-column"
					style={{}}
				>
					<TodoInput
						newTitle={newTitle}
						newDescription={newDescription}
						handleTitleChange={setNewTitle}
						handleDescriptionChange={setNewDescription}
						handleAddTodo={handleAddTodo}
					/>
					<div className="todo-input-item flex-row gap-2">
						<SearchBar
							searchQuery={searchQuery}
							handleSearch={setSearchQuery}
							setSearchQuery={handleSearch}
						/>
						<SortOptions
							sortCriterion={sortCriterion}
							sortOrder={sortOrder}
							handleSortCriterionChange={setSortCriterion}
							handleSortOrderChange={setSortOrder}
							sortTodo={sortTodo}
						/>
						<DateFilter
							startDate={startDate}
							endDate={endDate}
							handleDateChange={handleDateChange}
						/>
					</div>
				</div>
			</div>

			<div className="container">
				<table className="todo-body mt-4 table table-striped table-hover" >
					<thead style={{ "border": "1px solid #ECECEC" }} className="p-5">
						<tr>
							<td className="d-flex justify-content-between">
								<span style={{ "width": "85%" }} className="pl-12 m-3">Task</span>
								<span style={{ "width": "15%" }} className="pl-7 m-3">Date</span>
							</td>
						</tr>
					</thead>
					<tbody >
						{searchResults.map((item, index) => {
							return (
								<tr
									className="accordion accordion-flush"
									key={item.id} draggable style={{ "cursor": "move" }}
									onDragStart={() => handleDragStart(index)}
									onDragOver={() => handleDragOver(index)}
									onDragEnd={handleDragEnd}
								>
									<td className="todo-list accordion-item m-0">
										<TodoItem
											key={item.id}
											item={item}
											index={index}
											checkedItems={checkedItems}
											hoveredItem={hoveredItem}
											isEditItem={isEditItem}
											editedTitle={editedTitle}
											editedDescription={editedDescription}
											handleHover={handleHover}
											handleToDoSUbmit={handleToDoSUbmit}
											handleToDoDelete={handleToDoDelete}
											handleToDoEdit={handleToDoEdit}
											handleSaveEdit={handleSaveEdit}
											setEditedDescription={setEditedDescription}
											setEditedTitle={setEditedTitle}
										/>

										<div
											id={`flush-collapse-${item.id}`}
											className="accordion-collapse collapse"
											data-bs-parent="#accordionFlushExample"
										>
											<div className="accordion-body">
												<Header
													handleToggleSubTaskInput={handleToggleSubTaskInput}
												/>
												{showSubTaskInput && (
													<SubTaskInput
														newSubTitle={newSubTitle}
														newSubDescription={newSubDescription}
														handleAddSubTask={handleAddSubTask}
														setNewSubTitle={setNewSubTitle}
														setNewSubDescription={setNewSubDescription}
														item={item}
													/>
												)}
												<hr style={{ color: "gray", opacity: "0.5" }} />

												{isEditItem !== item.id ? (
													<>
														{item.subtasks && (
															<ul className="sub-todo">
																{item.subtasks.map((subtask, subtaskIndex) => (
																	<SubTask
																		key={subtask.id}
																		subtask={subtask}
																		subtaskIndex={subtaskIndex}
																		checkedSubItems={checkedSubItems}
																		hoveredSubtaskId={hoveredSubtaskId}
																		isEditingSubtask={isEditingSubtask}
																		editedSubTitle={editedSubTitle}
																		editedSubDescription={editedSubDescription}
																		handleHoverSubtask={handleHoverSubtask}
																		handleToDoSubSUbmit={handleToDoSubSUbmit}
																		handleToDoSubDelete={handleToDoSubDelete}
																		handleToDoSubEdit={handleToDoSubEdit}
																		setEditedSubTitle={setEditedSubTitle}
																		setEditedSubDescription={
																			setEditedSubDescription
																		}
																		handleSaveEditSubtask={
																			handleSaveEditSubtask
																		}
																		index={index}
																	/>
																))}
															</ul>
														)}
													</>
												) : null}
											</div>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Todo;
