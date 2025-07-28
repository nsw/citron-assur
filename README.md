# Citron-Assur Application

Full-stack application with Angular frontend and Spring Boot backend.

## Project Structure
- `/frontend` - Angular 19 application
- `/backend` - Spring Boot 3.3.6 with Java 21

## Running the Application

### Backend
```bash
cd backend
mvn spring-boot:run
```
- Runs on http://localhost:8080
- Swagger UI available at http://localhost:8080/swagger-ui.html

### Frontend
```bash
cd frontend
npm start
```
- Runs on http://localhost:4200
- Proxy configured to forward API calls to backend

## API Endpoints
- GET `/hello` - Returns "Hello Citron-Assur!"