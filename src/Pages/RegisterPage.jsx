import { useState } from 'react';
import { register } from '../services/userService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    // variable contenant les données de l'utilisateur
    const [userData, setUserData] = useState({name:"", mail:"", password:""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // appel vers l'api avec les donnée du formulaire
            await register(userData)
            // redirection vers la page de login
            navigate('/login');
            alert("utilisateur inscrit")
            
        } catch (error) {

            alert("CPT")
            console.log(error)
            
        };
    }


    return (

        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter name" 
        value={userData.name} 
        onChange={(e) => setUserData({...userData, name: e.target.value })}
        required/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>mail</Form.Label>
        <Form.Control 
        type="mail" 
        placeholder="Enter mail"
        value={userData.mail} 
        onChange={(e) => setUserData({...userData, mail: e.target.value })}
        required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        value={userData.password} 
        onChange={(e) => setUserData({...userData, password: e.target.value })}
        required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

      );
}
 
export default RegisterPage;