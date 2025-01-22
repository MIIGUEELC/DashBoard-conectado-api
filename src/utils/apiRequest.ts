import { bodyInterface } from "../features/interfaces/interfaces";

const urlBase = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint: string, method:string, body?:bodyInterface ) => {
  const result = await fetch(`${urlBase}/${endpoint}`, {
    method: `${method}`,
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem('token')}`,
    },
     body: JSON.stringify(body)
  });
  const response = await result.json();
  return response;
}