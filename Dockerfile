FROM node:20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code, including tests
COPY . .

# Build the Next.js app
RUN npm run build

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Use the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
