## ejs 模板使用

### 简单使用

> url /home

> render

```
title: 'home',
user: {
    name: 'pauly',
    age: 10
}
```

> parser

```
<% if (user) { %>
    <h2><%= user.name %></h2>
    <h3><%= user.age %></h3>
<% } %>
```

### 表达式 ifelse 

> url ifelse

> render

```
title: 'home',
user: null
```

> parser

```
<% if (user) { %>
    <h2><%= user.name %></h2>
    <h3><%= user.age %></h3>
<% } else {%>
    <h2> user is empty </h2>
<% } %>
```

### include 

> url list

> render

```
title: 'list',
users: [
    { name: 'tj' },
    { name: 'mape' },
    { name: 'guillermo' }
]
```

> parser

```
<ul>
    <% users.forEach(function(user){ %>
        <% include user/show %> 
    <% }); %>
</ul>

<ul style="background:gray">
    <% users.forEach(function(user){ %>
        <%- include('user/show', {user: user}) %>
    <% }); %>
</ul>
```

### forEach

> url /select

> render

```
title: 'select',
users: [
    { name: 'tj' },
    { name: 'mape' },
    { name: 'guillermo' }
]
```

> parser

```
<% if (users) { %>
    <select name="" class="matter">
    <% users.forEach(function(user){ %>
        <option  value="<%= user.name %>" ><%= user.name %></option>
    <% }); %>
    </select>
<% } %>
```


### for

> url /ergodic

> render

```
title:'ergodic',
person: {
    name: 'pauly',
    age: 10
},
users: [
    { name: 'tj' },
    { name: 'mape' },
    { name: 'guillermo' }
]
```

> parser

```
//遍历数组
<% if (users) { %>
<select name="" class="matter">
<% for(var i =0;i<users.length;i++){ %>
    <option  value="<%= users[i].name %>" ><%= users[i].name %></option>
<% } %>
</select>
<% } %>

//遍历成员变量
<div> 
    <% for(var k in person){ %>
    <%= person[k]%> 
    <% } %>
</div>
```

### delimiter

> url /delimiter

> render

```
title: 'delimiter',
users: [
    'geddy', 'neil', 'alex'
],
delimiter: '?',
```

> parser

```
<ul>
    <?= users.join(" | "); ?>
</ul>
```