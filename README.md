# Customer Server

## Installation

```bash
# Install packages
npm install

npx prisma generate
```

## Variables setup

Use the .env.example to create a new .env file for your project, with your own settings.


## Local database

```bash
# Setup local postgres
docker run --name recruitment-task -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11.16

# Set the .env file with your local database credentials

# Run migration
npx prisma migrate dev

# Run db seed
npx prisma db seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
