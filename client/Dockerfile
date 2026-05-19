# ================================
# Client Dockerfile (React + Vite)
# Multi-stage build: Build → Nginx se serve
# ================================

# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

# Pehle sirf package files copy karo (caching k liay)
COPY package*.json ./

# Saari dependencies install karo (dev bhi chahiye build k liay)
RUN npm install

# Source code copy karo
COPY . .

# Vite se production build banao (output: /app/dist)
RUN npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:alpine

# Builder stage se built files copy karo nginx folder mein
COPY --from=builder /app/dist /usr/share/nginx/html

# React Router k liay nginx config (refresh pe 404 na aaye)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Nginx ka port
EXPOSE 80

# Nginx start karo
CMD ["nginx", "-g", "daemon off;"]