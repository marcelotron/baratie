// TESTE DE CONEXÃO COM O BANCO

import { db } from "./db.js";

async function main() {
    const [mesas] = await db.query("SELECT * FROM mesas");
    console.log(mesas);
}

main();
