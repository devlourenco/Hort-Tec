// Importar a dependência Axios para conectar com a API
import axios from "axios";

// Criar a instância de conexão HTTP
const api = axios.create({
    baseURL: 'http://192.168.15.7:3333'
});

// Exporta a instância configurada do Axios
export default api;