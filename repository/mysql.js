import mysql from "mysql2/promise";

async function connect() {
  return mysql.createConnection({
    host: "localhost",
    port: 3306,
    password: "",
    database: "db_tcc",
    user: "root",
  });
}

export default {connect}
