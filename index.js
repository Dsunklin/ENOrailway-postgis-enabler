console.log("🚀 Service container started, running index.js...");

const { Client } = require('pg');

async function enablePostGIS() {
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Railway PostgreSQL");

    await client.query("CREATE EXTENSION IF NOT EXISTS postgis;");
    console.log("PostGIS extension enabled!");

    const res = await client.query("SELECT PostGIS_Version();");
    console.log("PostGIS version:", res.rows[0].postgis_version);

  } catch (err) {
    console.error("Error enabling PostGIS:", err);
  } finally {
    await client.end();
  }
}

enablePostGIS();
setInterval(() => {
  console.log("Service is still running...");
}, 60000); // every 60 seconds
