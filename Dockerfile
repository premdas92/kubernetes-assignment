# FinOps Best Practice: Use lean alpine image to save storage/costs
FROM node:18-alpine
WORKDIR /app
COPY src/package*.json ./
RUN npm install --only=production
COPY src/ .
EXPOSE 3000
CMD ["node", "app.js"]