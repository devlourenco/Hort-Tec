import database from "../repository/mysql.js";

async function createUserArduino(id_usuario, id_arduino, planta_nome, umidade_ideal, temperatura_ideal) {
    const sql = "INSERT INTO usuario_arduino(usuario_id, arduino_id, nome, umidade_ideal, temperatura_ideal) VALUES(?,?,?,?,?)"

    const dataUser = [
      id_usuario,
      id_arduino,
      planta_nome,
      umidade_ideal,
      temperatura_ideal
    ]

    const conn = await database.connect();
    await conn.query(sql, dataUser);
    conn.end();
}

async function listUserArduino(id){
  const sql = `select ua.id, ua.nome, ua.umidade_ideal, ua.temperatura_ideal, ua.status, ua.umidade_atual from usuario_arduino as ua inner join usuarios as u on ua.usuario_id = u.id where u.id = ${id}`

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}

async function findAutomacaoById(id){
  const sql = `select * from usuario_arduino where id = ${id}`

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}

async function verifyUserArduino(id){
  const sql = `select ua.id, ua.nome, ua.umidade_ideal, ua.temperatura_ideal, ua.status, ua.umidade_atual from usuario_arduino as ua inner join usuarios as u on ua.usuario_id = u.id where ua.arduino_id = ${id}`

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}

async function updateUserArduino(id, nome, umidade_ideal, temperatura_ideal){
  const sql = "update usuario_arduino set nome=?, umidade_ideal=?, temperatura_ideal=? where id=?;"

  const data = [nome, umidade_ideal, temperatura_ideal, id]

  const conn = await database.connect();
  await conn.query(sql, data);
  conn.end();
}

export default { createUserArduino, listUserArduino, verifyUserArduino, findAutomacaoById, updateUserArduino };