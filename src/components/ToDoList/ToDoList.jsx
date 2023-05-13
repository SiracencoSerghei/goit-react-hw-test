import { Component } from 'react'
import ToDo from '../ToDo/ToDo'
// import todo from '../../todo.json'
import { nanoid } from 'nanoid'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react'

const ToDoList = () => {

	const [todoList, setTodoList] = useState('')
	const [nameTodo, setNameTodo] = useState('')
	const [isCreated, setIsCreated] = useState(false)
	const [isDeleted, setIsDeleted] = useState(false)

	useEffect(() => {
		const localTodo = localStorage.getItem('todo')
		if (localTodo) {
			setTodoList(JSON.parse(localTodo))
		}
	}, [])

	useEffect(() => {
		todoList && localStorage.setItem('todo', JSON.stringify(todoList))

	}, [todoList])

	const handleCheck = (id) => {
		setTodoList((prevState) => {
		  return prevState.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		  );
		});
	  };

	const handleChange = ({ target: { value } }) => {
		setNameTodo(value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setTodoList((prevTodoList) => [
			...prevTodoList,
			{
				id: nanoid(),
				title: nameTodo,
				completed: false,
			},
		]
		)
		toast.success('Created to-do successfully!')
		setNameTodo('')
		setIsCreated(true)
		setTimeout(() => {
			setIsCreated(false)
		}, 1500)
	}

	const handleDelete = (id) => {
		setTodoList((prevTodoList) => {
			return prevTodoList.filter((todo) => todo.id !== id)
		})
		toast.error('Deleted to-do successfully!')
		setIsDeleted(true)
		setTimeout(() => {
			setIsDeleted(false)
		}, 1500)
	}
console.log(todoList.length);
	return (
		<>
		<Toaster 
		position='top-right'
		duration= '3000'
		/>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label
						htmlFor='exampleInputEmail1'
						className='form-label'
					>
						To-Do Name:
					</label>
					<input
						name='nameTodo'
						type='text'
						className='form-control'
						onChange={handleChange}
						value={nameTodo}
					/>
				</div>
			</form>
			<h1>My To-Do list</h1>
			{todoList && (
				<ul className='list-group list-group-flush'>
					{todoList.map((todo) => (
						<ToDo
							handleDelete={handleDelete}
							check={handleCheck}
							key={todo.id}
							todo={todo}
						/>
					))}
				</ul>
			)}
		</>
	)
}

export default ToDoList

// class ToDoList extends Component {
// 	state = { todoList: [], nameTodo: '', isCreated: false, isDelete: false }

// 	componentDidMount() {
// 		const localData = localStorage.getItem('todo')
// 		if (localData) {
// 			this.setState({ todoList: JSON.parse(localData) })
// 		}
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevState.todoList !== this.state.todoList) {
// 			localStorage.setItem('todo', JSON.stringify(this.state.todoList))
// 		}
// 		if (prevState.todoList.length < this.state.todoList.length) {
// 			this.setState({ isCreated: true })
// 			setTimeout(() => {
// 				this.setState({ isCreated: false })
// 			}, 1500)
// 		}
// 		if (prevState.todoList.length > this.state.todoList.length) {
// 			this.setState({ isDelete: true })
// 			setTimeout(() => {
// 				this.setState({ isDelete: false })
// 			}, 1500)
// 		}
// 	}

	// handleCheck = (id) => {
		// this.setState((prev) => {
		// 	return {
		// 		todoList: prev.todoList.map((el) =>
		// 			el.id === id ? { ...el, completed: !el.completed } : el
		// 		),
		// 	}
		// })
	// }

	// handleChange = ({ target }) => {
	// 	this.setState({ nameTodo: target.value })
	// }

	// handleSubmit = (e) => {
	// 	e.preventDefault()

	// 	this.setState((prev) => {
	// 		return {
	// 			todoList: [
	// 				...prev.todoList,
	// 				{
	// 					id: nanoid(),
	// 					title: this.state.nameTodo,
	// 					completed: false,
	// 				},
	// 			],
	// 		}
	// 	})
	// 	this.setState({ nameTodo: '' })
	// }

	// handleDelete = (id) => {
	// 	this.setState((prev) => ({
	// 		todoList: prev.todoList.filter((el) => el.id !== id),
	// 	}))
	// }

// 	render() {
// 		return (
			// <>
			// 	{this.state.isCreated && (
			// 		<div className='alert alert-primary' role='alert'>
			// 			Created to-do successfully!
			// 		</div>
			// 	)}
			// 	{this.state.isDelete && (
			// 		<div className='alert alert-danger' role='alert'>
			// 			Deleted to-do successfully!
			// 		</div>
			// 	)}
			// 	<form onSubmit={this.handleSubmit}>
			// 		<div className='mb-3'>
			// 			<label
			// 				htmlFor='exampleInputEmail1'
			// 				className='form-label'
			// 			>
			// 				To-Do Name:
			// 			</label>
			// 			<input
			// 				name='nameTodo'
			// 				type='text'
			// 				className='form-control'
			// 				onChange={this.handleChange}
			// 				value={this.state.nameTodo}
			// 			/>
			// 		</div>
			// 	</form>
			// 	<h1>My To-Do list</h1>
			// 	{this.state.todoList.length > 0 && (
			// 		<ul className='list-group list-group-flush'>
			// 			{this.state.todoList.map((todo) => (
			// 				<ToDo
			// 					handleDelete={this.handleDelete}
			// 					check={this.handleCheck}
			// 					key={todo.id}
			// 					todo={todo}
			// 				/>
			// 			))}
			// 		</ul>
			// 	)}
			// </>
// 		)
// 	}
// }

// export default ToDoList
