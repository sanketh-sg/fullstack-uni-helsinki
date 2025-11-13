import { useDispatch } from 'react-redux'
import { anecdoteCreator } from '../reducers/anecdoteReducer'
import { useState } from 'react'


const AnecdoteForm = () => { 
  // const anecdoteRef = useRef(null)
    const [anecdoteContent, setAnecdote] = useState('') 

//   const handleCreate = e => { 
//   e.preventDefault() 
//   const value = anecdoteRef.current ? anecdoteRef.current.value : '' 
//   console.log('value from ref:', value) 
//   if (!value.trim()) 
//     return dispatch({ type: 'CREATE', content: value }) 
//   anecdoteRef.current.value = '' // clear the DOM value 
// }

    const handleCreate = e => {
        e.preventDefault()
        console.log('content:', anecdoteContent)
        dispatch(anecdoteCreator(anecdoteContent))
        setAnecdote('')
    }



    const dispatch = useDispatch()

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
            <div>
                {/* <input ref={anecdoteRef} />  */}
                <input value={anecdoteContent} onChange={e => setAnecdote(e.target.value)} />
            </div>
            <button type='submit'>create</button>
        </form>
        </>
    )
}
export default AnecdoteForm