# SB Learn 2

SB Learn is a simple and configurable flashcard web application.

## Requirements

- MySQL 5.7
- Java Development Kit 11
- Node.js

## Setting Up

The application requires MySQL credentials and the database. Make sure that you have a `utf8` or `utf8mb4` character set database and a user with full database access to allow database migration.

The first step is to run the backend. To connect backend with the MySQL database, you have to set these environment variable `MYSQL_HOST`, `MYSQL_USERNAME`, `MYSQL_PASSWORD` and `MYSQL_DATABASE` according to your database settings. After finished you may want to build a JAR file to run or you can run directly from source code. All the commands are Spring Boot's default commands. For example, `./mvnw spring-boot:run` runs the application directly from the source code and `./mvnw clean install` generates the JAR file. Running the JAR file is as simple as `java -jar target/sblearn-*.jar`

After the backend is up and running, the next step is to run the frontend. Change to `frontend` directory to work with frontend code. Run `npm install` to install the dependencies. After that, you can use `npm start` to run development server. However, it is recommended that you build the source code with `npm run build` for development build or `npm run build -- --prod` for production build. The generated files will be in `frontend/dist/sb-learn-frontend` folder and you can use any web server to serve these static files.

## Frontend Commands

All the commands are Angular's default commands. For example,

```bash
# Change to frontend directory
$ cd frontend

# Install dependencies
$ npm install

# To run a development server
$ ng serve

# To build a frontend
$ ng build # Development mode
$ ng build --prod # Production mode
```

## Backend Commands

All the commands are Spring Boot's default commands. For example,

```bash
# To run the application from source
$ ./mvnw spring-boot:run

# To run tests
$ ./mvnw test

# To compile the source code to JAR file
$ ./mvnw clean install
```
