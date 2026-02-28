FROM node:20-alpine AS build

WORKDIR /app

# Copy both files for better caching
COPY package.json package-lock.json* ./

# Install dependencies properly
RUN npm ci

# Copy the rest of the app
COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Fix vite permission issue
RUN chmod +x node_modules/.bin/vite

RUN npm run build


FROM nginx:alpine

# Remove default nginx static config (optional but clean)
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]