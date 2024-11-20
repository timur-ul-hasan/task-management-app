# Setup Instructions

Application consists of two independent services: `frontend` and `backend`. Both services are dockerized and can be run independently.

## API Service [Laravel, Postgres & Nginx]

### Backend Setup Instructions

1. Navigate to `backend` directory
2. Populate `.env` from `.env.example` file and update the values as needed
1. Run the following commands:
```
docker-compose up -d --build
```
4. Application will be available at `http://localhost:8888`

5. Details of the API endpoints can be found at  Backend/README.md

## Web UI Service [React & Nginx]

### Setup Instructions

1. Navigate to `frontend` directory
2. Populate `.env` file with the following content:

```
REACT_APP_API_URL=http://localhost:5000
```

3. Run the following commands:

```
docker build -t task-management:latest . \
    --no-cache \
    --build-arg REACT_APP_API_ENDPOINT=http::/localhost::8888 \
    --build-arg ENVIRONMENT=production

docker run -p 80:80 --name task-management task-management 
```

4. Application will be available at `http://localhost`
