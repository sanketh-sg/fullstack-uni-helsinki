# Event Handlers
 The event handlers are simple: An object is given to them as a parameter, and they destructure the field target from the object and save its value to the state.

 If the login is successful, the form fields are emptied and the server response (including a token and the user details) is saved to the user field of the application's state.

 If the login fails or running the function loginService.login results in an error, the user is notified.

 The noteService module contains a private variable called token. Its value can be changed with the setToken function, which is exported by the module. create, now with async/await syntax, sets the token to the Authorization header. The header is given to axios as the third parameter of the post method.

 To save the user details in the browser and to retain it even after refresh we use Local storage. Local Storage is a key-value database in the browser. A value corresponding to a certain key is saved to the database with the method setItem.
 eg: window.localStorage.setItem('name', 'juha tauriainen')
 
 getItem can be used to retrieve the info and removeItem to remove.

its origin specific each web application has its own storage.

Values saved to the storage are DOMstrings, so we cannot save a JavaScript object as it is. The object has to be parsed to JSON first, with the method JSON.stringify. Correspondingly, when a JSON object is read from the local storage, it has to be parsed back to JavaScript with JSON.parse.

The empty array as the parameter of the effect ensures that the effect is executed only when the component is rendered for the first time.

The child components are the React elements that we define between the opening and closing tags of a component. Unlike the "normal" props we've seen before, children is automatically added by React and always exists. If a component is defined with an automatically closing /> tag

## Lifting the state up
When we want to change state of two components always together. To do this we need to do 3 things,
1. remove the state from child component.
2. move it to closest parent and pass it down via props.
3. add state to comman parent. Finally, pass the event handlers down so that the children can change the parent’s state.

## References to components using useRef

When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

You can access the current value of that ref through the ref.current property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track. 

There are several different ways to implement access to a component's functions from outside the component, the ref mechanism of React, offers a reference to the component.