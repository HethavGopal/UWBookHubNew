# UWBookHub Deployment Guide

This guide covers deploying the UWBookHub application using Docker and Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your server
- Domain name (for production deployment)
- SSL certificates (optional, for HTTPS)

## Quick Start (Development/Testing)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd UWBookHubNew
   ```

2. **Set up environment files**
   ```bash
   # Backend environment
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your values
   nano backend/.env
   
   # Create frontend environment file
   touch frontend/.env
   ```

3. **Build and start all services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017
   - Redis: localhost:6379

## Production Deployment

### 1. Environment Configuration

#### Backend Environment (`backend/.env`)
```bash
# Essential production settings
NODE_ENV=production
PORT=5000
DB_URL=mongodb://mongo:27017/uwaterloo-marketplace

# Security (CHANGE THESE!)
JWT_SECRET_KEY=your-super-secure-jwt-secret-key-here
SESSION_SECRET=your-super-secure-session-secret-here
REDIS_PASSWORD=your-secure-redis-password

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----"

# CORS (adjust to your domain)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Frontend Environment (`frontend/.env`)
```bash
VITE_API_URL=https://yourdomain.com/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

#### Root Environment (`.env` in project root)
```bash
# Database credentials
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your-secure-mongo-password

# Redis password
REDIS_PASSWORD=your-secure-redis-password

# Grafana password (if using monitoring)
GRAFANA_PASSWORD=your-grafana-password
```

### 2. SSL/HTTPS Configuration

For production with SSL:

1. **Obtain SSL certificates**
   ```bash
   # Using Let's Encrypt (recommended)
   sudo apt install certbot
   sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
   
   # Copy certificates to nginx/ssl/
   sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/certificate.crt
   sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/private.key
   ```

2. **Update Nginx configuration**
   - Uncomment the HTTPS server block in `nginx/nginx.conf`
   - Replace `your-domain.com` with your actual domain

3. **Update Docker Compose**
   - Ensure ports 80 and 443 are exposed in the nginx service

### 3. Database Initialization

The MongoDB service includes an initialization script. Make sure the following file exists:
- `backend/scripts/mongo-init.js` (for database setup)

### 4. Deployment Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build backend
docker-compose up -d backend

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

### 5. Health Checks

Your deployment includes health checks:

- **Backend Health**: http://yourdomain.com/api/health
- **Nginx Health**: http://yourdomain.com/health
- **Database Status**: Check container status with `docker-compose ps`

### 6. Monitoring (Optional)

Enable monitoring services:

```bash
# Start with monitoring profile
docker-compose --profile monitoring up -d

# Access monitoring
# Prometheus: http://yourdomain.com:9090
# Grafana: http://yourdomain.com:3001
```

## Deployment Checklist

- [ ] Environment files configured (`backend/.env`, `frontend/.env`, `.env`)
- [ ] SSL certificates in place (production)
- [ ] Nginx configuration updated with correct domain
- [ ] Firewall configured (ports 80, 443, 22)
- [ ] DNS records pointing to server
- [ ] Docker and Docker Compose installed
- [ ] Database initialization script ready
- [ ] Backup strategy in place

## Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using port 80
   sudo netstat -tulpn | grep :80
   ```

2. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER nginx/
   ```

3. **Container won't start**
   ```bash
   # Check logs
   docker-compose logs service-name
   ```

4. **Database connection issues**
   ```bash
   # Check if MongoDB is running
   docker-compose exec mongo mongo --eval "db.adminCommand('ismaster')"
   ```

### Log Locations

- Application logs: `docker-compose logs`
- Nginx logs: Available in container `/var/log/nginx/`
- Backend logs: `backend/logs/` directory

## Production Security

1. **Change default passwords** in all environment files
2. **Use secrets management** for sensitive data
3. **Enable firewall** and close unnecessary ports
4. **Regular updates** of Docker images
5. **Backup strategy** for database and user uploads
6. **Monitor logs** for suspicious activity

## Scaling

For high-traffic scenarios:

1. **Load Balancer**: Place a load balancer in front of Nginx
2. **Database Cluster**: Use MongoDB Atlas or replica sets
3. **Redis Cluster**: Scale Redis for better caching
4. **CDN**: Use CloudFlare or similar for static assets

## Support

- Check logs: `docker-compose logs -f`
- Restart services: `docker-compose restart service-name`
- Full reset: `docker-compose down -v && docker-compose up -d` 