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