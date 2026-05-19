# ================================
# Server Dockerfile (Node.js / Express)
# ================================

FROM node:18-alpine

# Working directory set karo
WORKDIR /app

# Pehle sirf package files copy karo (caching k liay)
COPY package*.json ./

# Sirf production dependencies install karo
RUN npm install --omit=dev

# Baqi sab files copy karo
COPY . .

# Port expose karo
EXPOSE 1000

# Server start karo, npm run dev (local development), node index.js (production)
CMD ["node", "index.js"]