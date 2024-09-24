// Importar a dependência Axios para conectar com a API
import axios from "axios";

// Criar a instância de conexão HTTP
const api = axios.create({
    baseURL: 'http://172.20.10.3:3333'
});

// Exporta a instância configurada do Axios
export default api;