# Node image for React Frontend
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Set Port and expose
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "start"]
