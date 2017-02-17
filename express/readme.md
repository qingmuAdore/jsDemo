### [session](https://github.com/expressjs/session) 

```
中间件: express-session

//session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: { maxAge: 60 * 1000 }
}));

//get session 
app.get('/', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
```

### [cookie](https://github.com/expressjs/cookie-parser) 

```
中间件: cookie-parser

//cookie
app.use(cookieParser())

//服务端 获取及其设置
app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

```

>  [客户端](http://www.w3school.com.cn/js/js_cookies.asp)

```

```