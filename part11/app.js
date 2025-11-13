const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('Pokedex version: 1.2.0')
})

app.get('/healthz', (req, res) => {
  res.send('OK')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
