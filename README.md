# URL Shortener Service

A high‑performance URL shortener built with **Node.js**, **Express**, **Redis**, and **MongoDB Atlas**.  
Designed to run locally with Docker Compose and deploy seamlessly on [Render](https://render.com).

---

## Features

- Shorten long URLs with auto‑generated short codes (base62 encoded)
- Support for custom short codes
- Optional expiry time for links
- Redirect to original URL with 301 (permanent) redirects
- Persistent storage with MongoDB Atlas
- In‑memory caching with Redis for ultra‑fast lookups
- Fully containerized with Docker
- Ready for production deployment on Render

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (primary storage)
- **Cache / Fast Lookups:** Redis
- **Container:** Docker, Docker Compose
- **Deployment:** Render (Web Service + Managed Redis)

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (for local development)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier works)
- (Optional) A [Render](https://render.com) account for deployment

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


