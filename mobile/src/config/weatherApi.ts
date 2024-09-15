import axios from "axios";

// Definindo o tipo para o retorno da API
export type currentProps = {
  locationName: string;
  temperatureMin: number;
  temperatureMax: number;
  wind: number;
  humidity: number;
  currentTemperature: number;
};

// Criar a instância de conexão HTTP
export default async function apiWeather(lat: number, lon: number): Promise<currentProps | null> {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=02fc1c808acb8fd07d2e555a955b9cab`;
  
  try {
    const response = await axios.get(baseURL);
    const data = response.data;
    
    // Montar o objeto de resultado
    const locationName = `${data.sys.country}, ${data.name}`;
    const temperatureMin = data.main.temp_min;
    const temperatureMax = data.main.temp_max;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    const currentTemperature = data.main.temp;

    const result: currentProps = {
      locationName,
      temperatureMin,
      temperatureMax,
      wind,
      humidity,
      currentTemperature
    };

    return result;
  } catch (err) {
    console.error("Erro ao buscar dados do clima:", err);
    return null; // Retornar null em caso de erro
  }
}
