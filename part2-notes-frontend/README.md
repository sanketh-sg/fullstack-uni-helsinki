## Event Handlers
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

## Testing React apps (Jest, Vitest, jsdom)

Normally React components are rendered to the DOM. The render method we used renders the components in a format that is suitable for tests without rendering them to the DOM.

We can use the object screen to access the rendered component. We use screen's method getByText to search for an element that has the note content and ensure that it exists

The existence of an element is checked using Vitest's expect command. Expect generates an assertion for its argument, the validity of which can be tested using various condition functions. Now we used toBeDefined which tests whether the element argument of expect exists. The getByText command, by default, searches for an element that contains only the text provided as a parameter and nothing else. 

In React there are (at least) two different conventions for the test file's location. We created our test files according to the current standard by placing them in the same directory as the component being tested.

The other convention is to store the test files "normally" in a separate test directory.

### Debugging tests
We typically run into many different kinds of problems when writing our tests.

Object screen has method debug that can be used to print the HTML of a component to the terminal. 

Mock objects and functions are commonly used stub components in testing that are used for replacing dependencies of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.

## Integration testing
we wrote integration tests for the backend that tested its logic and connected the database through the API provided by the backend. When writing these tests, we made the conscious decision not to write unit tests, as the code for that backend is fairly simple, and it is likely that bugs in our application occur in more complicated scenarios than unit tests are well suited for.

So far all of our tests for the frontend have been unit tests that have validated the correct functioning of individual components. Unit testing is useful at times, but even a comprehensive suite of unit tests is not enough to validate that the application works as a whole.

We could also make integration tests for the frontend. Integration testing tests the collaboration of multiple components. It is considerably more difficult than unit testing, as we would have to for example mock data from the server. 

## Snapshot testing
Vitest offers a completely different alternative to "traditional" testing called snapshot testing. The interesting feature of snapshot testing is that developers do not need to define any tests themselves, it is simple enough to adopt snapshot testing.

The fundamental principle is to compare the HTML code defined by the component after it has changed to the HTML code that existed before it was changed.

If the snapshot notices some change in the HTML defined by the component, then either it is new functionality or a "bug" caused by accident. Snapshot tests notify the developer if the HTML code of the component changes. The developer has to tell Vitest if the change was desired or undesired. If the change to the HTML code is unexpected, it strongly implies a bug, and the developer can become aware of these potential issues easily thanks to snapshot testing.