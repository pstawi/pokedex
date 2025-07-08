import axios from 'axios';
// création d'une instance axios pour les requêtes API
// avec une URL de base pour éviter de répéter l'URL complète dans chaque requête
const API = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export default API;