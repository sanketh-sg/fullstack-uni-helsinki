# Redux
Quite often most of the app state and state altering functions reside directly in the root component. The state and its handler methods have then been passed to other components with props. This works up to a certain point, but when applications grow larger, state management becomes challenging.

Flux was introduced to make it easier to manage state, Redux was built using same principles.

Action with the help of dispatcher changes the state in a store, When an action changes the state of the store, the views are rerendered.

Any interations in view generates an action.

As in Flux, in Redux the state is also stored in a store.

The whole state of the application is stored in one JavaScript object in the store. Because our application only needs the value of the counter, we will save it straight to the store. If the state was more complicated, different things in the state would be saved as separate fields of the object.

The state of the store is changed with actions. Actions are objects, which have at least a field determining the type of the action. If there is data involved with the action, other fields can be declared as needed.

Action and state talk with the help of reducer, store.dispatch takes an action

The impact of the action to the state of the application is defined using a reducer. In practice, a reducer is a function that is given the current state and an action as parameters. It returns a new state.

The reducer is never supposed to be called directly from the application's code. It is only given as a parameter to the createStore function which creates the store

The store now uses the reducer to handle actions, which are dispatched or 'sent' to the store with its dispatch method.

create reducerFunc --> createStore(redFunc) --> createStore.dispatch(reducerFunc.type) (eg. store.dispatch({ type: 'INCREMENT' }))

The third important method that the store has is subscribe, which is used to create callback functions that the store calls whenever an action is dispatched to the store. For every dispatch call this callback fucntion will be called.

1. Create a reducer function which takes store and action as params. Defines the cases for each action.type and return a new state.
2. Pass the reducer func to createStore() method. use the store to dispatch actions. eg store.dispatch({type: 'ACTION'})
3. subscribe to a callback which is called after each dispatch. eg. store.dispatch(() => {})

When the state in the store is changed, React is not able to automatically re-render the application. Thus we have registered a function renderApp, which renders the whole app, to listen for changes in the store with the store.subscribe method. Note that we have to immediately call the renderApp method. Without the call, the first rendering of the app would never happen.

Reducers are pure functions, Pure functions are such, that they do not cause any side effects and they must always return the same response when called with the same parameters.

A reducer state must be composed of immutable objects. If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object. 

## Forwarding redux store to other components

There are multiple ways to share the Redux store with the components. First, we will look into the newest, and possibly the easiest way, which is using the hooks API of the react-redux library.

Note, that the application is now defined as a child of a Provider component provided by the react-redux library. The application's store is given to the Provider as its attribute store. This makes the store accessible to all components in the application.

```js
import { useSelector, useDispatch } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
```
in react-redux dispatch function is replaced by useDispatch hook. The useDispatch hook provides any React component access to the dispatch function of the Redux store defined in main.jsx. This allows all components to make changes to the state of the Redux store.

The component can access the notes stored in the store with the useSelector-hook of the react-redux library. useSelector receives a function as a parameter. The function either searches for or selects data from the Redux store. Usually, selector functions are a bit more interesting and return only selected parts of the contents of the Redux store.

## Combining Reducers
you can combine reducers using combineReducers form redux and provide it to the store. When an action is dispatched all the reducers listen to it and perform the action based on the defined type.
eg:
```js
 const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
```
redux-toolkit eliminates the need for boilerplate code. With Redux Toolkit, we can easily create reducer and related action creators using the createSlice function. We can use the createSlice function to refactor the reducer and action creators