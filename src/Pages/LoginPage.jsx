import React from 'react';
import { useState } from 'react';
import { login } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // variable contenant les données de l'utilisateur
    const [userData, setUserData] = useState({ mail: "", password: "" });
    const navigate = useNavigate();

    // fonction qui gère la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // appel vers l'api avec les données du formulaire
            // et récupération du token
            const response = await login(userData);
            
            // stockage du token dans le localStorage
            localStorage.setItem("token", response.data.token);

            // redirection vers la page d'accueil
            navigate('/');
            
            alert("User logged in successfully");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        }
    }

    return (
        <div className="container">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="mail" 
                    placeholder="Enter mail"
                    // préparation de l'input pour la saisie de l'email
                    value={userData.mail}
                    // mise à jour de l'état userData lors de la saisie
                    onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
                    required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
      );
}
 
export default LoginPage;