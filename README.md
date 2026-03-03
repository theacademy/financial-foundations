# Financial Foundations — Deployment Guide

A comprehensive guide to setting up, running, and deploying the [financial-foundations](https://github.com/theacademy/financial-foundations) static web application across three environments: local development, AWS S3, and Docker.

---

## Table of Contents

1. [Overview](#overview)
2. [Local Development Setup](#1-local-development-setup)
3. [AWS S3 Automatic Deployment](#2-aws-s3-automatic-deployment)
4. [Docker Deployment](#3-docker-deployment)
5. [Quick Reference](#quick-reference)
6. [Security Considerations](#security-considerations)

---

## Overview

**Financial Foundations** is a plain HTML/CSS static site. It requires no build step, no package manager, and no JavaScript framework. This simplicity makes it straightforward to run locally or deploy to any static hosting environment.

| Environment | Best For | Skill Level |
|---|---|---|
| Local (Python/Node) | Development and testing | Beginner |
| AWS S3 (GitHub Actions) | Production hosting with CI/CD | Intermediate |
| Docker (Nginx) | Containerized or self-hosted environments | Intermediate |

---

## 1. Local Development Setup

### Prerequisites

Before you begin, ensure the following are installed on your machine:

- **Git** — [Download here](https://git-scm.com)
- **One of the following** local web servers:
  - Python 3.x (recommended — included by default on macOS/Linux)
  - Python 2.x
  - Node.js with `npx`

> **Why a web server?** Opening `index.html` directly in a browser (`file://`) can block some asset loads due to browser security policies. A local server avoids this.

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/theacademy/financial-foundations.git
cd financial-foundations
```

---

### Step 2 — Start a Local Web Server

Choose the command that matches your environment:

```bash
# Python 3 (recommended)
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js
npx serve . -p 8080
```

The server will start and output the address it's listening on (e.g., `Serving on http://0.0.0.0:8080`).

---

### Step 3 — Open the Application

Navigate to the following URL in your browser:

```
http://localhost:8080
```

**Expected result:** The Financial Foundations homepage loads successfully.

---

### Troubleshooting

| Symptom | Likely Cause | Solution |
|---|---|---|
| `Address already in use` | Port 8080 is occupied by another process | Replace `8080` with an available port, e.g. `3000` or `5500` |
| `404 Not Found` or blank page | Server not started from the repo root | Confirm you ran `cd financial-foundations` before starting the server; `index.html` must be in the current directory |
| `python3: command not found` | Python not installed or wrong version alias | Try `python` instead of `python3`, or install Python from [python.org](https://python.org) |
| `npx: command not found` | Node.js not installed | Install Node.js from [nodejs.org](https://nodejs.org) or use the Python server instead |
| **VS Code users** | — | Right-click `index.html` → **Open with Live Server** (requires the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)) for auto-reload on save |

---

## 2. AWS S3 Automatic Deployment

The repository includes a pre-configured **GitHub Actions** workflow (`.github/workflows/`) that automatically deploys the site to an **AWS S3 bucket** on every push to the `main` branch.

### Prerequisites

- Write access to the `theacademy/financial-foundations` GitHub repository
- AWS credentials already configured as **GitHub repository secrets** (setup by the repository administrator):
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

> **Note for repository administrators:** If the deployment workflow has not yet been configured, add the AWS credentials under **Settings → Secrets and variables → Actions** in the GitHub repository. Ensure the associated IAM user has `s3:PutObject`, `s3:DeleteObject`, and `s3:ListBucket` permissions on the target bucket.

---

### Step 1 — Commit and Push Changes

```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

Pushing to `main` automatically triggers the GitHub Actions workflow, which builds and syncs the site to S3.

---

### Step 2 — Monitor the Deployment

Track the workflow progress in real time:

```
https://github.com/theacademy/financial-foundations/actions
```

**Expected result:** A green checkmark (✅) appears next to the latest workflow run, indicating a successful deployment. A red ✗ indicates a failure — click the run to view detailed logs.

---

### Step 3 — Verify the Live Site

Once the workflow completes, confirm the site is live:

```
http://mthree-peregrine-s3-2.s3-website-us-east-1.amazonaws.com/
```

**Expected result:** The latest version of the Financial Foundations site is visible in your browser.

---

### Troubleshooting

| Symptom | Likely Cause | Solution |
|---|---|---|
| Workflow fails with `credentials error` | Missing or expired AWS secrets | Ask the repo admin to verify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in GitHub Secrets |
| Workflow passes but site shows old content | Browser cache | Hard-refresh with `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (macOS) |
| Workflow not triggered after push | Push not targeting `main` | Confirm you pushed to `main`, not a feature branch |
| 403 Forbidden on the S3 URL | Bucket public access blocked | Verify the S3 bucket policy allows public `s3:GetObject` access |

---

## 3. Docker Deployment

The repository ships with a `Dockerfile` and `nginx.conf`, enabling you to package and serve the application via **Nginx** in a self-contained container. This approach is ideal for self-hosted servers or environments where you want consistent, reproducible deployments.

### Prerequisites

- **Docker Desktop** installed and running — [Download here](https://www.docker.com/products/docker-desktop/)
- Basic familiarity with the Docker CLI

> **Verify Docker is running** before proceeding:
> ```bash
> docker --version
> # Expected output: Docker version 24.x.x, build ...
> ```

---

### Step 1 — Clone the Repository

If you have not already cloned the repository:

```bash
git clone https://github.com/theacademy/financial-foundations.git
cd financial-foundations
```

---

### Step 2 — Build the Docker Image

```bash
docker build -t financial-foundations:latest .
```

This command reads the `Dockerfile` in the current directory and creates a local image tagged `financial-foundations:latest`.

**Expected output (last line):**
```
naming to docker.io/library/financial-foundations:latest
```

> **Tip:** The first build may take a minute to download the base Nginx image. Subsequent builds are faster due to Docker's layer cache.

---

### Step 3 — Run the Container

```bash
docker run -d -p 8080:80 --name financial-foundations financial-foundations:latest
```

| Flag | Purpose |
|---|---|
| `-d` | Runs the container in the background (detached mode) |
| `-p 8080:80` | Maps port `8080` on your machine to port `80` inside the container (Nginx's default port) |
| `--name financial-foundations` | Assigns a human-readable name to the container for easier management |

---

### Step 4 — Verify the Application

```
http://localhost:8080
```

**Expected result:** The Financial Foundations site loads from the Nginx container.

---

### Container Management

Use these commands to manage the container lifecycle:

```bash
# List all running containers (confirm financial-foundations is listed)
docker ps

# View container logs (useful for diagnosing Nginx errors)
docker logs financial-foundations

# Stop the running container
docker stop financial-foundations

# Remove the stopped container
docker rm financial-foundations

# Remove the local image (frees disk space)
docker rmi financial-foundations:latest

# Rebuild and restart after code changes
docker stop financial-foundations && docker rm financial-foundations
docker build -t financial-foundations:latest .
docker run -d -p 8080:80 --name financial-foundations financial-foundations:latest
```

---

### Troubleshooting

| Symptom | Likely Cause | Solution |
|---|---|---|
| `port is already allocated` | Port 8080 in use on your machine | Change the host port in `-p 8080:80` to e.g. `-p 3000:80` |
| `Cannot connect to Docker daemon` | Docker Desktop not running | Open Docker Desktop and wait for it to fully start |
| Container starts but site won't load | Nginx misconfiguration | Run `docker logs financial-foundations` to inspect errors; check `nginx.conf` |
| `container name already in use` | A container named `financial-foundations` already exists | Run `docker rm financial-foundations` first, then re-run the `docker run` command |

---

## Quick Reference

| Method | Command to Start | Access URL |
|---|---|---|
| Local — Python 3 | `python3 -m http.server 8080` | `http://localhost:8080` |
| Local — Python 2 | `python -m SimpleHTTPServer 8080` | `http://localhost:8080` |
| Local — Node.js | `npx serve . -p 8080` | `http://localhost:8080` |
| AWS S3 (auto) | `git push origin main` | `http://mthree-peregrine-s3-2.s3-website-us-east-1.amazonaws.com/` |
| Docker | `docker run -d -p 8080:80 financial-foundations:latest` | `http://localhost:8080` |

---

## Security Considerations

Keep the following practices in mind when operating this application in production environments.

**AWS S3**
- Never commit AWS credentials to the repository. Always store them as GitHub Secrets.
- Apply the principle of least privilege to the IAM user — grant only the S3 permissions required for deployment.
- Consider enabling **S3 Versioning** on the bucket to allow rollback to previous deployments.
- If using a custom domain, serve the site over HTTPS via **CloudFront** rather than exposing the S3 bucket URL directly.

**Docker**
- Regularly update the base Nginx image (`docker pull nginx:alpine`) to receive security patches, then rebuild your image.
- Do not run the container as root in production. Add a non-root user in the `Dockerfile` if deploying to a server.
- Avoid exposing Docker management ports (e.g., the Docker socket) to untrusted networks.

**General**
- Review and remove any sensitive data (API keys, credentials, internal URLs) before committing to a public repository.
- Keep Git and Docker up to date on developer machines.
