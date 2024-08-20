FROM cgr.dev/chainguard/node

ENV NODE_ENV=production
RUN echo $(node -v)


COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN npm install --omit-dev

CMD ["npm", "run", "start"]
