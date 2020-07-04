# Battle

## How to run the backend (GraphQL Server)

```bash
>_ cd graphql
>_ yarn
```

First you need to run the postgress db on your local machine (via docker)

```bash
>_ yarn db:start

# To shut the docker container down run
# >_ yarn db:stop
```

Then it's necessary to do a migration and generate a Prisma Client

```bash
>_ yarn prisma:justdoit
```

Let's seed some fake data to our database now

```bash
>_ yarn db:seed
```

To run the Prisma Studio

```bash
>_ yarn prisma:studio
```

## How to run the frontend (Next.js app)

```bash
>_ cd frontend
>_ yarn
>_ yarn dev
```

## Queries

```graphql
query battles {
  battles {
    id
    description
    userId
  }
}
```

```graphql
query battle($id: ID!) {
  battle(id: $id) {
    id
    description
    userId
  }
}
```

```graphql
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

## Mutations

```graphql
mutation signup(
  $fullName: String!
  $userName: String!
  $email: String!
  $password: String!
) {
  signup(
    fullName: $fullName
    userName: $userName
    email: $email
    password: $password
  ) {
    token
    user {
      id
      userName
      email
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

```graphql
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      userName
      email
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
