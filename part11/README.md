## Commands

Start by running `npm install` inside the project folder

`npm start` to run the webpack dev server
`npm test` to run tests
`npm run eslint` to run eslint
`npm run build` to make a production build
`npm run start-prod` to run your production build


## Errors and fixes
Root cause and fix
Router compnent imported twice.

Cause: App.jsx was importing BrowserRouter and renaming it to Routes:
import { BrowserRouter as Routes, Route, useMatch } from 'react-router-dom'
That made the component named Routes actually be a BrowserRouter instance. Your index already wraps <App /> in a <Router> (BrowserRouter). So when App rendered its "Routes" it actually rendered a second BrowserRouter inside the first — React Router forbids nesting Routers and throws the error you saw.

Fix I applied (small one-line change)
I changed the import in App.jsx to import the real Routes component instead of BrowserRouter:

import { Routes, Route, useMatch } from 'react-router-dom'


Jest import was missing 

function defining tests were missing
