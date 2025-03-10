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