
#start from installing node js
FROM node:18-alpine

# All commands after this run inside /app inside the container
WORKDIR /app

# Copy package.json first (before copying code)
# Docker caches this layer — if package.json didn't change
# it won't re-run npm install on every build (saves time)
COPY package*.json ./
RUN npm install --production

# Now copy everything else into the container
COPY . .

# ── Stage 5: tell Docker which port your app uses ────
EXPOSE 3000

# ── Stage 6: the command to start the app ────────────
CMD ["node", "/server.js"]