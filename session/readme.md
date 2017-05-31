## session third library

> express-session

```
var session = require('express-session');
```

> app.use

```
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: { maxAge: 60 * 1000 }
}));

```

## value

```
request.session.isLogin = true;
request.session.user = u._doc;
```

## use

> /user/register

```
register user
```

> /user/login

```
user login

session 记录登录及其用户信息
```

> /main

```
若用户已登录,则main页显示用户信息
  用户未登录,则重定向到用户登录页
```