FROM denoland/deno
WORKDIR /app
COPY . .
RUN deno install
ENTRYPOINT [ "deno", "task", "start" ]
