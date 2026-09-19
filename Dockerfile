FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json ./
RUN npm i

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV SENDGRID_API_KEY=${SENDGRID_API_KEY}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}
ENV SESSION_SECRET=${SESSION_SECRET}
ENV DATA_DIR=/app/data
ENV UPLOADS_DIR=/app/uploads

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/data/seed ./data/seed

RUN mkdir -p /app/data /app/uploads && chown -R nextjs:nodejs /app/data /app/uploads

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js