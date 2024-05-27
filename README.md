# Alumni-Tracking-with-Docker
## Running the Project with Docker Compose

This project is configured to run using Docker Compose. Docker Compose simplifies the process of managing multi-container Docker applications.

## Prerequisites

Before you begin, ensure that you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Project

To run the project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <project_directory>

2. **Build and Start the Containers**

   ```bash
   docker-compose up --build
3. **Access the Application**
  - Client Application: http://localhost:5002
  - Server Application: http://localhost:3000
4. **Shut Down the Containers**

   ```bash
   docker-compose down

## Additional Notes
- Ensure that the required ports (5002 for the client and 3000 for the server) are not being used by other services on your system.
- For production deployments, consider using the appropriate Docker Compose file (docker-compose.prod.yml) and making necessary adjustments for production settings.
