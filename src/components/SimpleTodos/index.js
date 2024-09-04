import './index.css'
import {Component} from 'react'



const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

// Write your code here



class SimpleTodos extends Component {
  state = {userDataList: initialTodosList}

  deleteUser = id => {
    const {userDataList} = this.state

    const filteredDataList = userDataList.filter(each => each.id !== id)

    this.setState({
      userDataList: filteredDataList,
    })
  }

  render() {
    const {userDataList} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="title">Simple Todos</h1>
          <ul className="details-container">
            {userDataList.map(each => (
              <li key={each.id}>
                {each.title}
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
