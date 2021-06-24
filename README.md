# TODO's
#### This is a showcase todo app using nestjs as an API and flutter for mobile development


## Architecture
Fultter will act as a mobile app (IOS, Android) and web app

NestJs will act as an API and will be protected with JWT Bearer tokens


# Roadmap
- v1: CRUD ops for todo's and authentication
- v2: TBD


# Requirements
- user authentication
    - [] login with email and password
    - [] register with email and password
    - [] protected pages
- CRUD TODO's
    - [] create a todo
    - [] read a todo
    - [] read all todos
    - [] update a todo
    - [] delete a todo
- app state
    - [] loading
    - [] error handling


# Object definitions

- Todo:
    - id
    - title
    - details
    - date
    - owner (userId)

- User:
    - id
    - name
    - email
    - password
