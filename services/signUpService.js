import database from "../repository/mysql.js";

async function createUser(email, senha, nome, tipoUsuario) {
  const sql =
    "INSERT INTO usuarios(email, senha, nome, tipo_usuario) VALUES(?,?,?,?)";

  const dataUser = [email, senha, nome, tipoUsuario];

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

async function updateUser(id, email, senha, nome, tipoUsuario) {
  const sql =
    "UPDATE usuarios SET email = ?, senha = ?, nome =? tipoUsuario= ? WHERE id = ?;";

  const dataUser = [email, senha, nome, tipoUsuario, id];
  const conn = await database.connect();
  await conn.query(sql, dataUser);
  conn.end();
}

async function deleteUser(idUser) {
  const sql = "UPDATE usuarios SET deletado = 1 WHERE id = ?";

  const conn = await database.connect();
  await conn.query(sql, idUser);
  conn.end();
}

export default { createUser, listUser, updateUser, deleteUser };
