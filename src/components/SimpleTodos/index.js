import './index.css'
import {Component} from 'react'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isCompleted: false,
    isEditing: false,
  },
]

class SimpleTodos extends Component {
  state = {userDataList: initialTodosList, newTodoTitle: ''}

  deleteUser = id => {
    const {userDataList} = this.state
    const filteredDataList = userDataList.filter(each => each.id !== id)
    this.setState({userDataList: filteredDataList})
  }

  toggleComplete = id => {
    const {userDataList} = this.state
    const updatedList = userDataList.map(each => {
      if (each.id === id) {
        return {...each, isCompleted: !each.isCompleted}
      }
      return each
    })
    this.setState({userDataList: updatedList})
  }

  toggleEdit = id => {
    const {userDataList} = this.state
    const updatedList = userDataList.map(each => {
      if (each.id === id) {
        return {...each, isEditing: !each.isEditing}
      }
      return each
    })
    this.setState({userDataList: updatedList})
  }

  updateTodoTitle = (id, newTitle) => {
    const {userDataList} = this.state
    const updatedList = userDataList.map(each => {
      if (each.id === id) {
        return {...each, title: newTitle, isEditing: false}
      }
      return each
    })
    this.setState({userDataList: updatedList})
  }

  handleInputChange = event => {
    this.setState({newTodoTitle: event.target.value})
  }

  addTodo = () => {
    const {newTodoTitle, userDataList} = this.state

    if (newTodoTitle.trim() !== '') {
      const parts = newTodoTitle.trim().split(' ')
      const count = Number(parts[parts.length - 1])
      let title = newTodoTitle
      let numberOfTodos = 1

      if (!Number.isNaN(count)) {
        numberOfTodos = count
        title = parts.slice(0, -1).join(' ')
      }

      const newTodos = Array.from({length: numberOfTodos}, (_, index) => ({
        id: userDataList.length + index + 1,
        title,
        isCompleted: false,
        isEditing: false,
      }))

      this.setState({
        userDataList: [...userDataList, ...newTodos],
        newTodoTitle: '',
      })
    }
  }

  render() {
    const {userDataList, newTodoTitle} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="title">Simple Todos</h1>
          <div className="input-container">
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Enter a new todo or 'title count'"
              value={newTodoTitle}
              className="input"
            />
            <button onClick={this.addTodo} className="button" type="button">
              Add Todo
            </button>
          </div>
          <ul className="details-container">
            {userDataList.map(each => (
              <li key={each.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={each.isCompleted}
                  onChange={() => this.toggleComplete(each.id)}
                />
                {each.isEditing ? (
                  <input
                    type="text"
                    defaultValue={each.title}
                    onBlur={event =>
                      this.updateTodoTitle(each.id, event.target.value)
                    }
                    className="input"
                  />
                ) : (
                  <p
                    style={{
                      textDecoration: each.isCompleted
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {each.title}
                  </p>
                )}
                <button
                  onClick={() =>
                    each.isEditing
                      ? this.updateTodoTitle(each.id, each.title)
                      : this.toggleEdit(each.id)
                  }
                  className="button"
                  type="button"
                >
                  {each.isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => this.deleteUser(each.id)}
                  className="button"
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
