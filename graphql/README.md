# GraphQL server

```
query battles {
  battles {
    id
    description
    userId
  }
}
```

```
query users {
  users {
    id
    fullName
    battles {
      id
      description
      userId
    }
  }
}
```

```
mutation login {
  login(email: "hi@mynameisyuri.com", password: "test123") {
    token
    user {
      id
      fullName
      battles {
        id
        description
        userId
      }
    }
  }
}

```
