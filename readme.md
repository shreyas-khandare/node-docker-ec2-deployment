#  Dockerized Node.js Application with CI/CD on AWS EC2

##  Project Overview

This project demonstrates a complete end-to-end DevOps deployment pipeline:

- Node.js application
- Docker containerization
- Docker Compose orchestration
- AWS EC2 deployment (Ubuntu 24.04 LTS)
- Nginx reverse proxy configuration
- GitHub Actions CI/CD automation
- Secure SSH-based deployment
- Hardened network configuration

The application is deployed on AWS EC2 and automatically updates on every push to the `main` branch.

---

# 🏗 Architecture Overview

Developer (Local)
↓
GitHub Repository
↓
GitHub Actions (CI/CD)
↓
AWS EC2 (Ubuntu)
↓
Docker Engine
↓
Node.js Container
↓
Nginx Reverse Proxy
↓
Public Internet (Port 80)


---

# ⚙️ Local Development Setup

## 1️⃣ Install Dependencies

Inside WSL Ubuntu:

```bash
pnpm install
2️⃣ Run Application Locally
pnpm start
Access at:

http://localhost:3000
🐳 Docker (Local)
Build Docker Image
docker build -t devops-node-app .
Run Container
docker run -p 3000:3000 devops-node-app
Access:

http://localhost:3000
🧱 Docker Compose (Local or EC2)
Start Application
docker compose up -d --build
Stop Application
docker compose down
View Running Containers
docker ps
☁️ AWS EC2 Deployment
EC2 Configuration
Ubuntu 24.04 LTS

Instance type: t3.micro (Free Tier)

Region: ap-south-1 (Mumbai)

Storage: 8GB

SSH key authentication

Docker Engine installed

Docker Compose v2 plugin installed

🔐 Security Group Configuration
Inbound Rules:

Port	Purpose
22	SSH Access
80	HTTP (Public Access)
Port 3000 is NOT publicly exposed.

🔁 Nginx Reverse Proxy
Traffic Flow:

Public IP:80 → Nginx → localhost:3000 → Docker Container
Nginx Configuration:

server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
🔄 CI/CD Pipeline (GitHub Actions)
Trigger
Pipeline runs automatically on:

Push to main branch
Workflow Steps
Checkout repository

Setup SSH private key

SSH into EC2

Pull latest code

Rebuild Docker container

Restart container

Workflow file:

.github/workflows/deploy.yml
🔐 GitHub Secrets Required
Configured under:

Settings → Secrets and variables → Actions
Required secrets:

EC2_HOST

EC2_USER

EC2_SSH_KEY

Deployment Process
Manual Deployment (Initial Setup)
SSH into EC2:

ssh -i devops-key.pem ubuntu@<EC2_PUBLIC_IP>
Clone repository:

git clone <repo_url>
cd node-docker-ec2-deployment
Start container:

docker compose up -d --build
Automatic Deployment (After CI/CD Setup)
Every time you run:

git add .
git commit -m "Update"
git push
GitHub Actions automatically:

→ SSH into EC2
→ git pull
→ docker compose up -d --build
Application updates without manual SSH.

Testing Deployment
Push new changes

Go to GitHub → Actions tab

Wait for green check

Open:

http://<EC2_PUBLIC_IP>
🛠 Useful EC2 Commands
SSH:

ssh -i devops-key.pem ubuntu@<EC2_PUBLIC_IP>
Check running containers:

docker ps
View logs:

docker logs devops-node-app
Restart services:

docker compose restart
Stop services:

docker compose down
📂 Project Structure
.
├── Dockerfile
├── docker-compose.yml
├── index.js
├── package.json
├── pnpm-lock.yaml
└── .github/
    └── workflows/
        └── deploy.yml
Concepts Demonstrated
Linux server administration

Docker container lifecycle

Reverse proxy configuration (Nginx)

CI/CD automation using GitHub Actions

Secure SSH authentication

AWS EC2 provisioning

Security group hardening

Automated remote deployment

📈 Skills Demonstrated
DevOps fundamentals

Cloud deployment workflow

Infrastructure security practices

Deployment automation

Production-style architecture

Debugging container orchestration issues

Purpose of This Project
This project was built to:

Gain job-ready DevOps skills

Understand real-world deployment pipelines

Master system architecture fundamentals

Practice production-style infrastructure design

🏁 Final Result
Application publicly accessible via HTTP

Reverse proxy protecting internal ports

CI/CD fully automated

Deployment zero-manual-intervention

Cloud-hosted and production-structured

📌 Author
Shreyas
DevOps & Cloud Engineering Practice Project


---

If you'd like, I can now:

- Make a shorter recruiter-focused version  
- Make a resume bullet-point version  
- Or create a professional architecture diagram description section for the README.
