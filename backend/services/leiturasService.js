import database from "../repository/mysql.js";

async function createLeitura( usuario_arduino_id, umidade, tipo, status){
  const sql = "insert into leituras(usuario_arduino_id, umidade, tipo) values (?,?,?)"

  const sqlUpdate = `update usuario_arduino set status = '${status}', umidade_atual = ${umidade} where id=${usuario_arduino_id}`

  const dataLeitura = [
    usuario_arduino_id, 
    umidade, 
    tipo
  ]

  const conn = await database.connect()
  await conn.query(sql, dataLeitura)
  await conn.query(sqlUpdate)
  conn.end()
}

async function findLeituraByUsuario(usuario_id){
  const sql = `select ua.nome, l.tipo, ua.status, l.data_hora, l.umidade from leituras l inner join usuario_arduino ua on ua.id = l.usuario_arduino_id where ua.usuario_id = ${usuario_id}`

  const conn = await database.connect()
  const [rows] = await conn.query(sql)
  conn.end()
  return rows
}

async function findLeituraByAutomacao(usuario_id, usuario_arduino_id){
  const sql = `select ua.nome, l.tipo, ua.status, l.data_hora, l.umidade from leituras l inner join usuario_arduino ua on ua.id = l.usuario_arduino_id where ua.usuario_id = ${usuario_id} and ua.id = ${usuario_arduino_id}`

  const conn = await database.connect()
  const [rows] = await conn.query(sql)
  conn.end()
  return rows
}

export default {createLeitura, findLeituraByUsuario, findLeituraByAutomacao}