import { useDispatch, useSelector } from 'react-redux'


const AnecdoteList = ({ filterBy = '' }) => {
   
    const raw = useSelector(state => [...state])
    //sort by vote
    const anecdotes = raw
        .filter(a => filterBy === '' || a.content.toLowerCase().includes(filterBy.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch() // to send actions to store.
    const vote = (id) => {
        dispatch({
            type: 'VOTE',
            id
        })
    }
    return (
    <>
    {anecdotes.map(anecdote => (
    <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
    </div>
    ))}
    </>)
    
}
export default AnecdoteList