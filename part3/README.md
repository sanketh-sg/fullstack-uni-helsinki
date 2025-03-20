# NodeJS MongoDB ESLint and validation

Transpiling the JS, browsers do not support new features in JS so Babel converts it into older version or compatible version.

Node is backend it supports new features no need to do it when writing JS in backend.

Middleware are functions that can be used for handling request and response objects.

The json-parser we used earlier takes the raw data from the requests that are stored in the request object, parses it into a JavaScript object and assigns it to the request object as a new property body.

Middleware is a function that receives three parameters req,res,next 
next is called at the end of function body which yields control to next middleware.

used as app.use(middlewareName)
middleware functions are called in the order that they're encountered by the JavaScript engine

CORS (Cross-Origin Resource Sharing) is a security feature enforced by web browsers that prevents a frontend running on one origin (e.g., localhost:5173) from making requests to a backend running on a different origin (e.g., localhost:3001) unless the backend explicitly allows it.

Since the backend is not expected to be visible to the public in the production environment, it may make more sense to only enable cors from a specific origin (e.g. the front end).

Running on --> https://phonebook-app-ox3y.onrender.com/

To make Express show static content, the page index.html and the JavaScript, etc., it fetches, we need a built-in middleware from Express called static.
whenever Express gets an HTTP GET request it will first check if the dist directory contains a file corresponding to the request's address. If a correct file is found, Express will return it.

Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/api/notes will be handled by the backend code.

Because of our situation, both the frontend and the backend are at the same address, we can declare baseUrl as a relative URL.

Mongoose could be described as an object document mapper (ODM), and saving JavaScript objects as Mongo documents is straightforward with this library.
https://mongoosejs.com/docs/api/model.html#Model.findById()

# Error Handling

there are cases where it is better to implement all error handling in a single place. This can be particularly useful if we want to report data related to errors to an external error-tracking system like Sentry.
We pass the error forward with the next function. The next function is passed to the handler as the third parameter. The error that is passed forward is given to the next function as a parameter. 

If next was called without an argument, then the execution would simply move onto the next route or middleware. If the next function is called with an argument, then the execution will continue to the error handler middleware.

In Express error handlers are middleware that are defined with a function that accepts four parameters. 
```javascript
const errorHandler = (error, request, response, next) => {//some code}
```
Note that the error-handling middleware has to be the last loaded middleware, also all the routes should be registered before the error-handler!

By default, Express does not automatically parse request bodies because:
Parsing every request (even those that don’t need it) would be wasteful. Not all requests contain JSON. Some use URL-encoded data, form data, or other formats.
Express follows a middleware-based approach, meaning you must explicitly tell it how to handle different content types.


There is one important detail regarding the use of the findByIdAndUpdate method. By default, the updatedNote parameter of the event handler receives the original document without the modifications. We added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.

# Validation and ESLint

