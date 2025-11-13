# Redux
Quite often most of the app state and state altering functions reside directly in the root component. The state and its handler methods have then been passed to other components with props. This works up to a certain point, but when applications grow larger, state management becomes challenging.

Flux was introduced to make it easier to manage state, Redux was built using same principles.

As in Flux, in Redux the state is also stored in a store.

The whole state of the application is stored in one JavaScript object in the store. Because our application only needs the value of the counter, we will save it straight to the store. If the state was more complicated, different things in the state would be saved as separate fields of the object.

The state of the store is changed with actions. Actions are objects, which have at least a field determining the type of the action.

The impact of the action to the state of the application is defined using a reducer. In practice, a reducer is a function that is given the current state and an action as parameters. It returns a new state.

The reducer is never supposed to be called directly from the application's code. It is only given as a parameter to the createStore function which creates the store

The store now uses the reducer to handle actions, which are dispatched or 'sent' to the store with its dispatch method.

create reducerFunc --> createStore --> createStore.dispatch(reducerFunc.type) (eg. store.dispatch({ type: 'INCREMENT' }))

The third important method that the store has is subscribe, which is used to create callback functions that the store calls whenever an action is dispatched to the store. For every dispatch call this callback fucntion will be called.

When the state in the store is changed, React is not able to automatically re-render the application. Thus we have registered a function renderApp, which renders the whole app, to listen for changes in the store with the store.subscribe method. Note that we have to immediately call the renderApp method. Without the call, the first rendering of the app would never happen.

Reducers are pure functions, Pure functions are such, that they do not cause any side effects and they must always return the same response when called with the same parameters.

A reducer state must be composed of immutable objects. If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object. 