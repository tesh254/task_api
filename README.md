# Task API [![Build Status](https://travis-ci.com/tesh254/task_api.svg?branch=master)](https://travis-ci.com/tesh254/task_api)

Simple task API built with Node, Sequelize, Express and Postgresql as a database.

## Getting Started

Currently the API houses two endpoints, fetching all tasks and loggging in a user. The API use JWT Authentication. It also makes use of passport to authenticate users.

### Endpoints

#### Logging in a user

```bash
POST /auth/login
```
This is the login endpoint that returns an `accessToken` that can be used to access certain endpoints.

Since we need to send JSON request body to our server, set the headers to `application/json`.
```text
Content-Type: application/json
```
To login a user, you need two credentials to login, if your account does not exist or password mismatch you should recieve a descriptive error message.

You request body should look something similar
```json
{
    "phonenumber": "0705181707",
    "password": "test254"
}
```

If login was successful you should recieve a response of this blueprint
```json
{
    "reset_password": <no of times they have reset their password>,
    "accessToken": <token generate from login>,
    "expires_in": <shows the amount of time the token will expire>
}
```

#### Fetch all tasks

```bash 
GET /tasks/assigned?page=1&limit=5&order=createdAt&orderMethod=&
```

The URL is dynamic based on values provided in the query parameter. The parameters include:
* `page` is a query parameter that requests a certain page of tasks
* `limit` is a query parameter that limits how many tasks per page need to be fetched
* `order` is a query parameter that defines which field in the tasks table to order your tasks
* `orderMethod` is a query parameter that defines how the items are order either `DESC` -> Descending order or `ASC` -> Ascending order.

This API can only be accessed if the user is logged in, to fix that you need to login to get the token and apply the `Authorization` header.

```text
Authorization: Bearer <access token>
```

**Response**

```json
{
    "totalTasks": <the count of tasks existing in the database>,
    "page": <shows the current page>,
    "perPage": <shows how many tasks per page>,
    "tasks": [
        // Holds an array of tasks fetched with their details
    ]
}
```

### Error messages

* Password Errors
    When the password entered while logging in is incorrect
    ```json
    {
        "error": {
            "password": "You have entered an incorrect password"
        }
    }
    ```
* User Errors
    When logging in to a user account that does not exist
    ```json
    {
        "error": {
            "message": "User not found"
        }
    }
    ```
* Unauthorized Errors
    When trying to access a protected endpoint
    ```json
    {
        "error": {
            "message": "Unauthorized, please login"
        }
    }
    ```