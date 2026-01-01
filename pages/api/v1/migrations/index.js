import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ code: 405, error: "Method Not Allowed" });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationRunnerConfig = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(migrationRunnerConfig);
      await dbClient.end();
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const runnedMigrations = await migrationRunner({
        ...migrationRunnerConfig,
        dryRun: false,
      });
      await dbClient.end();
      return response
        .status(runnedMigrations.length === 0 ? 200 : 201)
        .json(runnedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  } finally {
    dbClient.end;
  }
}
