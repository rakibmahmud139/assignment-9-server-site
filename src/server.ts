import app from "./app";
import { Server } from "http";
import config from "./config";

const port = config.port;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
