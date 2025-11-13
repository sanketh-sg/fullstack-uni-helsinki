
import { useState } from 'react'
import Anecdote from './components/Anecdote'
import FilterAnecdote from './components/FilterAnecdote'


const App = () => {
  
  const [filter, setFilter] = useState('')

  return (
    <>
      <FilterAnecdote filterBy={filter} setFilterBy={setFilter} />
      <Anecdote filterBy={filter} />
    </>
  )
}

export default App
