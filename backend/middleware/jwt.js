import jwt from "jsonwebtoken";

export function createTokenJWT(id, nome, email, senha, tipo_usuario){
  const myKey = "M!nh@Ch@v&"
  const token = jwt.sign(
    {
      id, 
      nome, 
      email,
      senha, 
      tipo_usuario
    }, myKey
  )

  return token
}