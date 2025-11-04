# React Query, useReducer and contextAPI
A library to store and manage data retrieved from the server. Its also called as TanStack Query.

* Enclose the App under QueryClient provider
* wrap the query into useQuery function.
* to manipulate data on the server useMutation.mutate, onSuccess invalidate the state by using invalidateQueries(state).


The new note is saved on the server, but it is not updated on the screen.

In order to render a new note as well, we need to tell React Query that the old result of the query whose key is the string notes should be invalidated.  invalidation is easy, it can be done by defining the appropriate onSuccess callback function to the mutation.

This in turn causes React Query to automatically update a query with the key notes, i.e. fetch the notes from the server. As a result, the application renders the up-to-date state on the server, i.e. the added note is also rendered.

Updating the note is also done by mutation. The application works well, and the code is relatively simple. The ease of making changes to the list of notes is particularly surprising. For example, when we change the importance of a note, invalidating the query notes is enough for the application data to be updated.

The consequence of this, of course, is that after the PUT request that causes the note change, the application makes a new GET request to retrieve the query data from the server. If the amount of data retrieved by the application is not large, it doesn't really matter. After all, from a browser-side functionality point of view, making an extra HTTP GET request doesn't really matter, but in some situations it might put a strain on the server.

Finally, note an interesting detail. React Query refetches all notes when we switch to another browser tab and then return to the application's tab. This can be observed in the Network tab of the Developer Console.

What is going on? By reading the documentation, we notice that the default functionality of React Query's queries is that the queries (whose status is stale) are updated when window focus changes. If we want, we can turn off the functionality by creating a query.
```js
const App = () => {
  // ...
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,

    refetchOnWindowFocus: false
  })

  // ...
}
```

React Query is a versatile library that, based on what we have already seen, simplifies the application. Does React Query make more complex state management solutions such as Redux unnecessary? No. React Query can partially replace the state of the application in some cases, but as the documentation states

React Query is a server-state library, responsible for managing asynchronous operations between your server and client
Redux, etc. are client-state libraries that can be used to store asynchronous data, albeit inefficiently when compared to a tool like React Query.

So React Query is a library that maintains the server state in the frontend, i.e. acts as a cache for what is stored on the server. React Query simplifies the processing of data on the server, and can in some cases eliminate the need for data on the server to be saved in the frontend state.

## useReducer
```js
const [counter, counterDispatch] = useReducer(counterReducer, 0)
```

We can manage the frontend state using useState, redux and also using redux like useReducer hook. The hook useReducer provides a mechanism to create a state for an application. The parameter for creating a state is the reducer function that handles state changes, and the initial value of the state.

The reducer function that handles state changes is similar to Redux's reducers, i.e. the function gets as parameters the current state and the action that changes the state. The function returns the new state updated based on the type and possible contents of the action.

When the application is split into multiple components, the counter value and the dispatch function used to manage it must somehow be passed to the other components as well. One solution is to pass these as props in the usual way.

The solution works, but is not optimal. If the component structure gets complicated, e.g. the dispatcher should be forwarded using props through many components to the components that need it, even though the components in between in the component tree do not need the dispatcher. This phenomenon is called prop drilling.

## contextAPI
React's built-in Context API provides a solution for us. React's context is a kind of global state of the application, to which it is possible to give direct access to any component app. Other components can now access the context using the useContext hook.

Components therefore receive the value provided by the context provider. In this case the context is an object with a field counter that represents the counter's value and a field counterDispatch that is the dispatch function used to change the counter's state.

* By enclosing the components that requires the props with ```<CounterContext.Provider value={{ counter, counterDispatch }}> ``` and inside these components we do ```const { counter } = useContext(CounterContext)``` we can share the state across different components.

# Which state management is best?

In chapters 1-5, all state management of the application was done using React's hook useState. Asynchronous calls to the backend required the use of the useEffect hook in some situations. In principle, nothing else is needed.

A subtle problem with a solution based on a state created with the useState hook is that if some part of the application's state is needed by multiple components of the application, the state and the functions for manipulating it must be passed via props to all components that handle the state. Sometimes props need to be passed through multiple components, and the components along the way may not even be interested in the state in any way. This somewhat unpleasant phenomenon is called prop drilling. But there is no final solution yet.

For a simple application, useState is certainly a good starting point. If the application is communicating with the server, the communication can be handled in the same way using the state of the application itself. If you are concerned about useState and the prop drilling it entails, using context may be a good option. There are also situations where it may make sense to handle some of the state with useState and some with contexts.

React-redux is a library that connects react with redux (Provider, createStore, useSelector, useDispatch)
Redux-toolkit abstraction on top of Redux (configureStrore, createSlice)
useReducer is a built in hook usefull for simple applications
