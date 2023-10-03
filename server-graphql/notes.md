# to install express

* npm i express
* npm i -D @types/express @types/node

## to install ts node

* npm i -D typescript ts-node

## to install nodemon

* npm i -D nodemon

## to install tsx

* npm i -D tsx

## cors

* npm i cors
* npm i -D @types/cors

## for tsconfig

- npx tsc --init

## Graphql

- **npm** init --yes **&&**npm** pkg **set**type**=**"module"**
- npm install @apollo/server graphql
- mkdir src
- touch src/index.ts
- npm install --save-dev typescript @types/node
- touch tsconfig.json
- tsconfig.json

  ```
  js
  {
    "compilerOptions": {
      "rootDirs": ["src"],
      "outDir": "dist",
      "lib": ["es2020"],
      "target": "es2020",
      "module": "esnext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "types": ["node"]
    }
  }
  ```
- package.json

  ```
  js
  "scripts": {
      "compile": "tsc",
      "start": "npm run compile && node ./dist/index.js"
    }
  ```

- npm run compile && node ./dist/index.js

## prisma

- npm install prisma --save-dev
- npx prisma init --datasource-provider postgresql
  -- Initialize Prisma and set the datasource provider to PostgreSQL.
- npx prisma migrate dev --name init
  --  to sync your database schema with your Prisma schema.

---

- prisma client : auto generated and type safety query builder
- prisma migrate : declarative data modeling and migration system
- prisma studio : gui to view and edit your data

---

- prisma db pull to turn your database schema into a Prisma schema.
- prisma generate to generate the Prisma Client. You can then start querying your database.
