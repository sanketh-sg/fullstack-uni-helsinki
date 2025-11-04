import reducer from './reducers/anecdoteReducer'
// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// const store = createStore(reducer)
const store = configureStore({ reducer })

export default store