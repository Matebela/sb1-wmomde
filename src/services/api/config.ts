import axios from 'axios';

export const JSEARCH_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

if (!JSEARCH_API_KEY) {
  console.warn('RapidAPI key is missing. Job search functionality will not work.');
}

export const jsearchApi = axios.create({
  baseURL: 'https://jsearch.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': JSEARCH_API_KEY,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  },
});