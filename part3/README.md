# NodeJS MongoDB ESLint and validation

Transpiling the JS, browsers do not support new features in JS so Babel converts it into older version or compatible version.

Node is backend it supports new features no need to do it when writing JS in backend.

Middleware are functions that can be used for handling request and response objects.

The json-parser we used earlier takes the raw data from the requests that are stored in the request object, parses it into a JavaScript object and assigns it to the request object as a new property body.

Middleware is a function that receives three parameters req,res,next 
next is called at the end of function body which yields control to next middleware.

used as app.use(middlewareName)
middleware functions are called in the order that they're encountered by the JavaScript engine