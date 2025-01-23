import { bodyInterface } from "../features/interfaces/interfaces";

const urlBase = import.meta.env.VITE_API_URL;


export const apiRequest = async (endpoint: string, method: string, body?: bodyInterface) => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token

    const result = await fetch(`${urlBase}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
       
        Authorization: token ? `Bearer ${token}` : '', 
      },
      body: body ? JSON.stringify(body) : null, 
    });

    if (!result.ok) {
      throw new Error(`Error: ${result.statusText}`);
    }

    const response = await result.json();
    return response;

  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
