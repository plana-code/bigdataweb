#!/bin/bash

# Deploy script for BigData Web App on app.bigdatarf.ru
# Server: 88.99.245.52

set -e

DOMAIN="app.bigdatarf.ru"
APP_DIR="/var/www/bigdataweb"
REPO_URL="https://github.com/plana-code/bigdataweb.git"

echo "🚀 Starting deployment for $DOMAIN..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "📦 Installing required packages..."
apt install -y nginx git certbot python3-certbot-nginx ufw

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

# Create app directory
echo "📁 Creating application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# Clone or update repository
if [ -d ".git" ]; then
    echo "🔄 Updating repository..."
    git pull origin main
else
    echo "📥 Cloning repository..."
    git clone $REPO_URL .
fi

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/bigdataweb << 'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name app.bigdatarf.ru;

    root /var/www/bigdataweb;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
NGINX_CONFIG

# Enable site
ln -sf /etc/nginx/sites-available/bigdataweb /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

# Restart Nginx
echo "🔄 Restarting Nginx..."
systemctl restart nginx
systemctl enable nginx

# Wait for DNS to propagate
echo "⏳ Waiting for DNS propagation..."
echo "Please ensure DNS A record for $DOMAIN points to 88.99.245.52"
echo "Press Enter when DNS is configured..."
read

# Install SSL certificate
echo "🔒 Installing SSL certificate..."
certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email noreply@bigdatarf.ru --redirect

# Setup auto-renewal
echo "🔄 Setting up SSL auto-renewal..."
systemctl enable certbot.timer
systemctl start certbot.timer

# Final checks
echo "✅ Checking services..."
systemctl status nginx --no-pager
certbot certificates

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "🌐 Your app is available at: https://$DOMAIN"
echo "📊 Check Nginx status: systemctl status nginx"
echo "🔒 Check SSL status: certbot certificates"
echo ""
echo "📝 To update the app in future, run:"
echo "   cd $APP_DIR && git pull origin main"