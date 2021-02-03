const express = require('express')
const morgan = require('morgan')
const port = 3000

const app = express()


// Strat
app.use(function (req, res, next) {
  req.requestTime = new Date()
  console.log('requestTime:', req.requestTime)
  setTimeout(function () {
    next();
  }, 3000)
})

app.use(function (req, res, next) {
  res.responseTime = new Date()
  console.log('responseTime:', res.responseTime)
  next();
})


app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})