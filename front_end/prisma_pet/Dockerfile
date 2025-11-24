# Etapa 1 — Build Angular 20
FROM node:20-alpine AS build

WORKDIR /app

# Copia dependências
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copia projeto completo
COPY . .

# Build modo produção (defaultConfiguration já é "production")
RUN npm run build

# Etapa 2 — Servir com NGINX
FROM nginx:stable-alpine

# Remove conteúdo default
RUN rm -rf /usr/share/nginx/html/*

# Copia apenas os arquivos corretos do Angular 20
# O builder @angular/build:application gera em dist/<project>/browser
COPY --from=build /app/dist/prisma_pet/browser /usr/share/nginx/html

# Adiciona config personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
