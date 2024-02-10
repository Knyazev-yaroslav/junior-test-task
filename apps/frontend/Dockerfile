FROM docker.io/node:19-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache jq

WORKDIR /app
ENV PORT 80
EXPOSE 80
ENV HOST 0.0.0.0
RUN npm install -g nx
COPY package*.json .
COPY tsconfig.base.json .
COPY nx.json .
RUN npm install
COPY apps/frontend/index.d.ts apps/frontend/jest.config.ts apps/frontend/next-env.d.ts apps/frontend/next.config.js apps/frontend/project.json apps/frontend/tsconfig.json ./apps/frontend/

ENV WATCHPACK_POLLING true

CMD ["nx", "dev", "frontend"]
