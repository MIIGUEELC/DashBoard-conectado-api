import { bodyInterface } from "../features/interfaces/interfaces";

const urlBase = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint: string, method: string, body?: bodyInterface) => {
  try {
    const result = await fetch(`${urlBase}/${endpoint}`, {
      method: `${method}`,
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        token: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body)
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
}

