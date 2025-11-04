const FilterAnecdote = ({ filterBy, setFilterBy }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    // Keep the filter value; no need to clear it here
    console.log('filter by:', filterBy)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          placeholder='Filter anecdotes'
        />
      </div>
      <button type='submit'>Filter</button>
    </form>
  )
}

export default FilterAnecdote