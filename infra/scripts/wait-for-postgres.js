const childProcess = require("node:child_process");

function checkPostgres() {
  childProcess.exec(
    "docker exec postgres-dev pg_isready --host localhost",
    handleReturn,
  );

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      checkPostgres();
      return;
    }
    console.log("🏁 o postgres está pronto para receber conexões");
  }
}

console.log("🔴 aguardando o postgres aceitar conexões...");

checkPostgres();
