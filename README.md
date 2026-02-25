# Financial Foundations — Deployment Guide

A comprehensive guide to setting up, running, and deploying the [financial-foundations](https://github.com/theacademy/financial-foundations) web application across three environments.

---

## Table of Contents

1. [Local Setup and Execution](#1-local-setup-and-execution)
2. [Automatic GitHub Hosting](#2-automatic-github-hosting)
3. [Manual Docker Deployment](#3-manual-docker-deployment)

---

## 1. Local Setup and Execution

### Prerequisites

- [Git](https://git-scm.com) installed
- Any local web server — Python's built-in server works perfectly for static sites

> **Note:** This is a plain HTML/CSS static site. There is no build step, no `npm install`, and no framework required.

### Steps

**Clone the repository**

```bash
git clone https://github.com/theacademy/financial-foundations.git
cd financial-foundations
```

**Start a local development server**

Choose whichever option matches your environment:

```bash
# Python 3 (recommended)
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js
npx serve . -p 8080
```

**Access the application**

```
http://localhost:8080
```

✅ **Success:** The financial foundations homepage loads in your browser.

### Troubleshooting

| Problem | Solution |
|---|---|
| Port already in use | Change `8080` to another port, e.g. `3000` or `5500` |
| Files not found | Confirm you're in the repo root where `index.html` lives |
| VS Code users | Right-click `index.html` → *Open with Live Server* (requires the Live Server extension) |

---

## 2. Automatic AWS Hosting

The repository includes a `.github/workflows` directory with a pre-configured GitHub Actions pipeline that automatically deploys to **AWS S3** on every push to `main`.

### Trigger a Deployment

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Pushing to `main` automatically triggers the workflow and deploys the latest code.

### Hosted URL

```
http://mthree-peregrine-s3-2.s3-website-us-east-1.amazonaws.com/
```

### Monitor Deployment Status

```
https://github.com/theacademy/financial-foundations/actions
```

✅ **Success:** A green checkmark appears next to the latest workflow run, and the site is live at the URL.

---

## 3. Manual Docker Deployment

The repository ships with a `Dockerfile` and `nginx.conf`, making it ready to containerize and serve via **Nginx**.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Steps

**Clone the repository (if not already done)**

```bash
git clone https://github.com/theacademy/financial-foundations.git
cd financial-foundations
```

**Build the Docker image**

```bash
docker build -t financial-foundations:latest .
```

✅ **Success:** Output ends with `naming to docker.io/library/financial-foundations:latest`

**Run the container**

```bash
docker run -d -p 8080:80 --name financial-foundations financial-foundations:latest
```

| Flag | Purpose |
|---|---|
| `-d` | Run container in the background |
| `-p 8080:80` | Map local port `8080` to Nginx's internal port `80` |
| `--name financial-foundations` | Assign a friendly name to the container |

**Access the application**

```
http://localhost:8080
```

✅ **Success:** The site loads in your browser from the containerized Nginx server.

### Container Management

```bash
# View running containers
docker ps

# View container logs
docker logs financial-foundations

# Stop the container
docker stop financial-foundations

# Remove the container
docker rm financial-foundations

# Remove the image
docker rmi financial-foundations:latest
```

## Quick Reference

| Method | Start Command | Access URL |
|---|---|---|
| Local (Python) | `python3 -m http.server 8080` | `http://localhost:8080` |
| AWS Hosting | `git push origin main` | `https://theacademy.github.io/financial-foundations/` |
| Docker | `docker run -d -p 8080:80 financial-foundations:latest` | `http://localhost:8080` |