FROM node:22-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /app

RUN chown -R app:app /app

USER app

COPY --chown=app:app package*.json ./
RUN npm install --legacy-peer-deps

COPY --chown=app:app . .

RUN npx prisma generate
RUN npm run build

COPY --chown=app:app entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]