import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ code: 405, error: "Method Not Allowed" });
  }

  const dryRun = request.method === "GET";

  const runnedMigrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });

  response.status(dryRun ? 200 : 201).json(runnedMigrations);
}
