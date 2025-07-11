# ==============================================================================
# UWaterloo Marketplace Backend - Production Dockerfile
# ==============================================================================

# Multi-stage build for smaller production image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ==============================================================================
# Production stage
# ==============================================================================
FROM node:18-alpine as production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY --chown=nodejs:nodejs . .

# Create logs directory
RUN mkdir -p logs && chown nodejs:nodejs logs

# Create uploads directory
RUN mkdir -p uploads && chown nodejs:nodejs uploads

# Remove unnecessary files for production
RUN rm -rf tests/ *.test.js *.spec.js

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "index.js"]

# ==============================================================================
# Metadata
# ==============================================================================
LABEL maintainer="UWaterloo Marketplace Team"
LABEL version="1.0.0"
LABEL description="UWaterloo Student Marketplace Backend API"

# Simple backend-only Dockerfile for Railway
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set memory-friendly npm config
RUN npm config set fund false && npm config set audit false

# Copy package files
COPY package*.json ./

# Install dependencies with aggressive memory optimization
RUN npm install --omit=dev --no-audit --no-fund --maxsockets 1 --ignore-scripts

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the application
CMD ["npm", "start"] 