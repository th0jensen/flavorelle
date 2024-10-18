FROM oven/bun:latest AS base

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY prisma ./prisma
RUN bun install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Set up db and seed
RUN bun run prisma migrate reset --skip-seed --force
RUN bunx prisma db push
RUN bun run ./prisma/seed.ts

# Build the application
RUN bun run build

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:./db.sqlite"

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
