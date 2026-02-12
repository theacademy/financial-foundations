# Use Nginx as the lightweight base image for serving static content
FROM nginx:1.25-alpine

# Copy your static website files into the Nginx web root directory
COPY . /usr/share/nginx/html/

# Copy a custom Nginx configuration (optional but recommended)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# The default CMD for Nginx image starts the Nginx daemon
CMD ["nginx", "-g", "daemon off;"]