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

export default { createUserArduino };