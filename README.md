# UWBookHub

UWBookHub is a full-stack used book marketplace built for University of Waterloo students to easily buy and sell textbooks.

## Overview

UWBookHub streamlines the textbook exchange process on campus, providing a platform where students can list, search for, and purchase used books. The platform focuses on affordability, simplicity, and peer-to-peer transactions.

## 🚀 Quick Start

### Development Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd UWBookHubNew

# Set up environment files
cp backend/env.example backend/.env
# Edit backend/.env with your configuration

# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete Docker deployment instructions.

---


## Tech Stack

| Tech              | Icons |
|-------------------|--------|
| **Frontend**      | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat) ![Tailwind](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat) ![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&style=flat) |
| **Backend**       | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat) ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) |
| **Database**      | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) |
| **Auth & Storage**| ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black&style=flat) |
| **API**           | ![REST API](https://img.shields.io/badge/-REST%20API-FF6F00?logo=api&logoColor=white&style=flat) |

---

## Features

- User authentication with Firebase
- List and manage textbook listings
- Search and filter books by title or course code
- Admin dashboard for managing inventory
- Clean, responsive UI with Tailwind CSS

---

