import database from "infra/database.js";

export default async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as SUM"); //try connect to postgres

  console.log(result.rows[0]);

  res.status(200).json({
    status: 200,
    success: true,
    message: "endpoint /v1/status adicionado com sucesso",
  });
}
