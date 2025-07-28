export default function status(req, res) {
  res.status(200).json({
    status: 200,
    success: true,
    message: "endpoint /v1/status adicionado com sucesso",
  });
}
