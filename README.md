# Assignment Project

This repository contains a full-stack application with separate frontend and backend components. The backend is built using NestJS and operates with an event-driven microservices architecture. The frontend is developed with React.


## Prerequisites

Before you start, ensure you have the following installed: 
- Docker 
- Node.js

## Getting Started

Follow these steps to get your project up and running.

### Backend Setup

1. Navigate to the backend root folder.
2. Each Microservice has an `.env.example` file, create for each an `.env` and copy the content from the .env.example to the real `.env`
3. Run the initialization script with Docker: `npm run project-init`
  This command starts the microservices in Docker containers. Ensure that port 8080  is available before proceeding.
  4. After the Docker containers are up, execute the following commands:
  
  - `npm run docker:migrate `
  - `npm run docker:generate` 
  - `npm run docker:seed`
    

### Frontend Setup

1. Navigate to the frontend root folder.
2. Create an `.env` file and add the following: `REACT_APP_BASE_URL=http://localhost:8080/`  or any other port you decide to run the api-gateway on.
3. Start the server with:

## Support

`For any questions, feel free to contact [dreni.g99@gmail.com](mailto:dreni.g99@gmail.com).`


