import API from "./api";

// Services pour les requêtes liées aux équipes
export const createTeam = (data) => API.post('/teams', data, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const addPokemonToTeam = (idTeams, data) => API.post(`/teams/${idTeams}/pokemon`, data, {
    
    
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
    
});

export const chooseTeams = () => API.get(`/chooseTeams`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const showTeams = () => API.get(`/userTeams`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const deleteTeam = (idTeams) => API.delete(`/deleteTeam/${idTeams}`,{
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
});