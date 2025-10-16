FROM nginx:alpine

# Install certbot for SSL
RUN apk add --no-cache certbot certbot-nginx

# Copy application files
COPY index.html /usr/share/nginx/html/
COPY src /usr/share/nginx/html/src/
COPY README.md /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create directories for SSL certificates
RUN mkdir -p /etc/letsencrypt /var/lib/letsencrypt

# Expose ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]