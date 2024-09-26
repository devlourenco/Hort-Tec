import database from "../repository/mysql.js";

async function verificarArduino(id) {
  const sql = `select * from arduinos where id = ${id}`

  const con = await database.connect()
  const [arduinos] = await con.query(sql)
  con.end();

  return arduinos
}

export default { verificarArduino };