# Battle

## How to run the backend (GraphQL Server)

```bash
>_ cd backend
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
