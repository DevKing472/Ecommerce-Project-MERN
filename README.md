# Fullstack app for Eshop

A fullstack app for managing eshop.

Starting:

1. Create **.env** in **/backend** with following info:

- MONGODB\_URL = '_Your url for mongo_'
- JWT\_SECRET = '_Secret phrase for JWT issuing_'
- SALT = '_Number for salting passwords_'
- ADMIN\_SECRET = '_Secret phrase for creating admin user_'
- HOST\_URL = 'http://localhost:3001'
- CLIENT\_URL = 'http://localhost:3000'

2. Run `npm run preinstall`
3. Run `npm run dev`

## Frontend:

- [NextJS](https://nextjs.org/)
- [SWR](https://swr.vercel.app/)
- [Material Design Bootstrap](https://mdbootstrap.com/)

Usefull resources for setting up this project:

- [Context with localStorage](https://medium.com/geekculture/how-to-use-context-usereducer-and-localstorage-in-next-js-cc7bc925d3f2)

## Backend:

- [ExpressJS](https://expressjs.com/)
- [PassportJS](https://passportjs.org/) for authentication
- Morgan for logging
- [Mongoose](https://mongoosejs.com/) for MongoDB
