# Setup

## MacOS/Linux

- `npm install`
- `npm start:dev`
- Open another terminal window; from there, `npm run seed` to seed the database

## Windows

- `npm install`
- `npm run build-watch` to start the webpack process
- Open another terminal window; from there, `npm run start-server` to start the server process
- Open another terminal window; from there, `npm run seed` to seed the database


## Sequelize Logging
- Logging can be quite helpful. It is off by default but easy to turn on without changing
any code
- You can turn on logging by using the environment variable LOGGING=true
- LOGGING=true npm run start:dev or LOGGING=true npm run seed
