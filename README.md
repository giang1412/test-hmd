# Auth Demo (NestJS + Prisma + MySQL)

## 📌 Giới thiệu

Dự án demo xây dựng hệ thống **Authentication/Authorization** sử dụng: -
[NestJS](https://nestjs.com/) (Modular, DI, Guards, Middleware) -
[Prisma ORM](https://www.prisma.io/) (Schema, Migration, Query
Builder) - [MySQL 8](https://www.mysql.com/) (Dockerized) - JWT (Access
token + Refresh token rotation)

## ⚙️ Yêu cầu

-   Node.js \>= 18
-   Docker & Docker Compose
-   pnpm / npm

## 🚀 Cài đặt

1.  Clone repo:

    ``` bash
    git clone https://github.com/giang1412/auth-demo.git
    cd auth-demo
    ```

2.  Tạo file `.env` từ mẫu:


    ``` bash
    DATABASE_URL="mysql://root:secret@localhost:3307/app_db"
    ACCESS_TOKEN_SECRET="asdasdasdasd",
    ACCESS_TOKEN_EXPIRES_IN=1d
    REFRESH_TOKEN_SECRET="asd3234dsfsdfsdasd",
    REFRESH_TOKEN_EXPIRES_IN=1y
    SECRET_API_KEY="asdasdasdsfgsdfsd",


    ```

3.  Chạy MySQL bằng Docker:

    ``` bash
    docker network create devnet
    docker run -d --name mysql8 --network devnet -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=app_db -p 3307:3306 mysql:8
    ```

4.  Cài dependencies:

    ``` bash
    npm install
    ```

5.  Generate Prisma Client:

    ``` bash
    npx prisma generate
    ```

6.  Push schema vào DB:

    ``` bash
    npx prisma db push
    ```

7.  Start server:

    ``` bash
    npm run start:dev
    ```

Server chạy tại: **http://localhost:5555**

------------------------------------------------------------------------

## 📡 API Endpoints

### Auth

-   `POST api/auth/register` -- Đăng ký
-   `POST api/auth/login` -- Đăng nhập
-   `POST api/auth/refresh-token` -- Lấy access token mới
-   `POST api/auth/logout` -- Đăng xuất
-   `GET api/auth/profile` -- Lấy thông tin user hiện tại



## 🛠️ Dev Notes

-   Prisma schema: `prisma/schema.prisma`
-   Auth module: `src/auth/`
-   Shared services (Prisma, Hashing): `src/shared/services/`

------------------------------------------------------------------------

## 🧪 Test nhanh

``` bash
curl -X POST http://localhost:5555/api/auth/register   -H "Content-Type: application/json"   -d '{"email":"test@mail.com","password":"123456","name":"Giang","phone":"0123456789","confirmPassword":"123456"}'
```

------------------------------------------------------------------------

