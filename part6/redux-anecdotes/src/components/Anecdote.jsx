import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
const Anecdote = ({ filterBy }) => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList filterBy={filterBy} />
      <AnecdoteForm />
    </div>
  )
}

export default Anecdote