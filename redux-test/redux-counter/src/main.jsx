import ReactDom from 'react-dom/client'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'


const store = createStore(noteReducer)
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {store.getState().map(note => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : 'not important'}</strong> 
          </li>
        ))}
      </ul>
    </div>
  )
}

const root = ReactDom.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)