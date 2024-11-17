import database from "../repository/mysql.js";

async function createUser(email, senha, nome) {
  const sql =
    "INSERT INTO usuarios(email, senha, nome) VALUES(?,?,?)";

  const dataUser = [email, senha, nome];

  const conn = await database.connect();
  await conn.query(sql, dataUser);
  conn.end();
}

async function listUser() {
  const sql = "SELECT * FROM usuarios WHERE deletado = 0";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function updateUser(id, email, senha, nome) {
  const sql =
    "UPDATE usuarios SET email = ?, senha = ?, nome = ? WHERE id = ?";

  const dataUser = [email, senha, nome, tipo_usuario, id];
  const conn = await database.connect();

  try {
    await conn.query(sql, dataUser);
    console.log("Usuário Editado");
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error.message);
  } finally {
    conn.end();
  }
}

async function deleteUser(idUser) {
  const sql = "UPDATE usuarios SET deletado = 1 WHERE id = ?";

  const conn = await database.connect();
  await conn.query(sql, idUser);
  conn.end();
}

async function verificarEmail(email) {
  const sql = `select * from usuarios where deletado = 0 and email = '${email}'`

  const con = await database.connect()
  const [users] = await con.query(sql)
  con.end();

  return users
}

async function verificarUsuario(id) {
  const sql = `select * from usuarios where deletado = 0 and id = '${id}'`

  const con = await database.connect()
  const [users] = await con.query(sql)
  con.end();

  return users
}

export default { createUser, listUser, updateUser, deleteUser, verificarEmail, verificarUsuario };


