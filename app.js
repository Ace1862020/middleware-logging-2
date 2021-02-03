const express = require('express')
// 嘗試使用模組，引入 morgan
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 自訂收到的請求時間
const requestTime = function (req, res, next) {
  req.requestTime = new Date()
  // 延遲 1 秒再下一步，測試response
  setTimeout(function () {
    next();
  }, 1000)
}

// 自訂送出的回應時間
const responseTime = function (req, res, next) {
  res.responseTime = new Date()
  next();
}

//自訂 Format 的 token
morgan.token('startTime', function (req, res) {
  return req.requestTime.toLocaleString()
})

morgan.token('endTime', function (req, res) {
  return res.responseTime.toLocaleString()
})

morgan.token('spendTime', function (req, res) {
  return (Date.parse(res.responseTime) - Date.parse(req.requestTime)) / 1000
})

//自訂設定 Format
morgan.format('logger', ':startTime | :method from :url | total time: :total-time[0] ms(毫秒) || :spendTime s')



//使用自訂的 morgan
app.use(morgan('logger'))
app.use(requestTime, responseTime)


app.get('/', (req, res) => {
  const message = '列出全部 Todo'
  res.render('index', { message })
})

app.get('/new', (req, res) => {
  const message = '新增 Todo 頁面'
  res.render('new', { message })
})

app.get('/:id', (req, res) => {
  const message = '顯示一筆 Todo'
  res.render('detail', { message })
})

app.post('/', (req, res) => {
  const message = '新增一筆 Todo'
  res.render('index', { message })
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})