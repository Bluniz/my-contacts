import PG from "pg";

const client = new PG.Client({
  host: "localhost",
  port: 49153,
  user: "postgres",
  password: "batata",
  database: "mycontacts",
});

client.connect();

export async function query(queryName, values) {
  const { rows } = await client.query(queryName, values);

  return rows;
}
