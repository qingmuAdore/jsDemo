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