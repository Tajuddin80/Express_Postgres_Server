# CRUD with Express, TypeScript & PostgreSQL

A simple and scalable built with Node.js, Express.js,
TypeScript, and PostgreSQL.

## 🚀 Features

-   CRUD operations (Users, Todos)
-   Authentication (Login/Register)
-   Middleware (Auth, Logger)
-   Service--Controller--Route architecture
-   PostgreSQL using pg Pool
-   TypeScript type safety
-   Ready for Vercel deployment

## 📁 Project Structure

    src/
     ├── app/
     ├── config/
     │   ├── db.ts
     │   └── index.ts
     ├── middleware/
     │   ├── auth.ts
     │   └── logger.ts
     ├── modules/
     │   ├── auth/
     │   ├── todo/
     │   └── user/
     ├── types/
     │   └── express/
     │       └── index.d.ts
     ├── app.ts
     └── server.ts

## 📦 Installation

``` sh
npm install
```

## 🏃 Run Dev Server

``` sh
npm run dev
```

## 🏗️ Build

``` sh
npm run build
```

## 🚀 Start Production

``` sh
npm start
```

## 📄 License

MIT License
