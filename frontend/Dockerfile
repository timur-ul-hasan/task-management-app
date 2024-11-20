FROM alpine AS base

WORKDIR /app

RUN apk update
RUN apk add --upgrade brotli

ARG REACT_APP_API_ENDPOINT 
ARG ENVIRONMENT

ENV REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT
ENV ENVIRONMENT=$ENVIRONMENT

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    apk add nodejs npm && \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

COPY . .

RUN npm run build

FROM alpine

RUN apk add nodejs

RUN apk add nginx brotli nginx-mod-http-brotli

RUN mkdir -p /var/lib/nginx/tmp/client_body \
    && mkdir -p /var/lib/nginx/logs \
    && chmod -R 755 /var/lib/nginx/tmp /var/lib/nginx/logs \
    && mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

COPY nginx/default.conf /etc/nginx/http.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactjs

COPY --from=base /app/dist /usr/share/nginx/html

CMD ["/entrypoint.sh"]

EXPOSE 3000 80 443