# ── Stage 1 : build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les manifestes en premier pour profiter du cache Docker
COPY package.json package-lock.json ./

RUN npm ci

# Copier le reste du code source
COPY . .

# Construire l'application (output dans /app/dist)
RUN npm run build

# ── Stage 2 : serve ──────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Supprimer la config nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Config nginx adaptée au routing SPA (react-router-dom)
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
