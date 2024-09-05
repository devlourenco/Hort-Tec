import database from "../repository/mysql.js"

async function validaLogin(email, senha){
  const sql = "select * from usuarios where email = ? and senha = ? and deletado = 0";

  const loginData = [email, senha]

  const conn = await database.connect()
  const [rows] = await conn.query(sql, loginData)
  conn.end()
  
  return rows
}

export default { validaLogin }