# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/app/package.json .
COPY src/app/package-lock.json .

# Install dependencies
RUN npm install --production

# Copy application code
COPY src/app/app.js .

# Expose port (the app listens on this port)
EXPOSE 3000

# Health check (Docker checks if app is healthy)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run the application
CMD ["node", "app.js"]