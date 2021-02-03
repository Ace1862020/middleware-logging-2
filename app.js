const express = require('express')
// 嘗試使用模組，引入 morgan
const morgan = require('morgan')
const port = 3000

const app = express()

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
morgan.format('logger', ':startTime | :method from :url | total time :spendTime s')

//使用自訂的 morgan
app.use(morgan('logger'))
app.use(requestTime, responseTime)

// 這個 /favicon.ico 是 Browser 網址標籤的圖示，Browser 預設會一直發出請求
// 可以用在<head>的<link>的rel屬性"icon"，給href屬性"data:"
const iconData = '<link rel="icon" href="data:;">'

app.get('/', (req, res) => {
  res.send(iconData + '列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send(iconData + '新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send(iconData + '顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send(iconData + '新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})