# URL Shortener Service

A scalable **URL Shortener** built with **Node.js, Express.js, MongoDB, Redis, Docker, and Nginx**. The application provides secure user authentication, URL shortening, fast redirects, rate limiting, and persistent data storage.
The backend is **horizontally scaled across 6 Dockerized Node.js replicas**, with **Nginx** acting as a load balancer to distribute incoming HTTP traffic. **Redis** is used for caching and rate limiting, while **MongoDB** provides persistent storage.
The system was load tested through Nginx with **1M+ HTTP requests at 1K concurrency**, achieving **~848 requests/sec with 100% successful responses**.

### Key Features

- 🔗 URL shortening and fast redirection
- 🔐 JWT-based authentication with bcrypt
- ⚡ Redis caching for frequently accessed URLs
- 🚦 Redis-based rate limiting
- 🐳 Dockerized application
- ⚖️ Nginx load balancing
- 📈 Horizontal scaling with 6 Node.js replicas
- 🗄️ MongoDB persistent storage
- 📊 Load testing with throughput and latency metrics
- 🛡️ User authentication and protected routes

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (primary storage)
- **Cache / Fast Lookups:** Redis
- **Container:** Docker, Docker Compose
- **Load balancer:** Nginx

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (for local development)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier works)

---

## Getting Started Locally 

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```
### 2. Set up environment variables
```bash
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/url-shortener?retryWrites=true&w=majority
REDIS_HOST=redis
REDIS_PORT=6379
PORT=3000
JWT_SECRET=
NGINX_CONTAINER_NAME=nginx_load_balancer
NGINX_PORT=80
PROJECT_NAME=url-shortener
```
- Replace <username>, <password>, and <cluster> with your MongoDB Atlas credentials.
- If your password contains special characters, URL‑encode them (e.g., @ → %40).
- The database url-shortener will be created automatically on first use.
### 3. Run with Docker Compose
- To run the containers in detach mode
```bash
docker compose -f dc.yaml up -d
```
- To down/delete the containers
```bash
docker compose -f dc.yaml down
```
### 4. Verify everything is running
```bash
docker-compose ps
docker-compose dc.yaml logs app
```
- You should see logs indicating:
- MongoDB Connected..
- Redis Connected..
- Server is running on port : 3000
### 5. Use the API
- The service will be available at http://localhost:3000.

### API Usage
#### Shorten a URL
- POST /shorten
- Request body (JSON):
```bash
{
  "longUrl": "https://example.com/very/long/path",
}
```
- Respose :
```bash
{
  "shortUrl": "http://localhost:3000/abc123",
}
```
## Load Testing

The application was tested through the Nginx load balancer with 6 Dockerized Node.js replicas.

### Run the Application

Start the application with 6 replicas:


```
docker compose -f dc.yaml up -d --scale app=6
```
Verify the running containers:
```
docker ps
```
Expected setup:
- 6 × Node.js application replicas
- 1 × Nginx load balancer
- 1 × Redis

Run Load Test
Navigate to the test directory:

```
cd tests
node loadtest.js
```

- **Load Balancer:** Nginx
- **Application Replicas:** 6
- **Total Requests:** 1,000,000
- **Concurrency:** 1,000
- **Endpoints:** `/user/login`,`/user/register/`,`/user/logout/`,`/`
- **Load Testing:** Node.js HTTP client

### Results

| Metric | Result |
|---|---:|
| Total Requests | 1,000,000 |
| Concurrency | 1,000 |
| Successful Responses | 1,000,000 |
| 4xx Errors | 0 |
| 5xx Errors | 0 |
| Network Failures | 0 |
| Throughput | ~848 req/s |
| Test Duration | ~1,179 sec |

The tests demonstrate horizontal scaling and Nginx-based load balancing across 6 Node.js replicas, successfully processing 1M+ HTTP requests at 1K concurrency.

