
import { getProfile, updateProfile, updatePassword } from '../services/userService';
import { useState, useEffect } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ name: '', mail: '' });
    const navigate = useNavigate();
    const [modalPassword, setModalPassword] = useState(false);
    const [formPassword, setFormPassword] = useState({ oldPassword: '', newPassword: '' });

    const fetchUser = async () => {
        try {
            const response = await getProfile();
            // console.log(response.data);
            setUser(response.data);

        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    // Fonction pour gérer la soumission du formulaire de mise à jour
    // Elle sera appelée lors de la soumission du formulaire dans la modal
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Mettre à jour le profil avec les données du formulaire
            const response = await updateProfile(form);
            // console.log(response.data);
            location.reload(); // Recharger la page pour mettre à jour l'affichage
            // Mettre à jour l'état de la modal
            setShow(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            if (formPassword.oldPassword != formPassword.newPassword) {
                // Mettre à jour le password avec les données du formulaire
                const response = await updatePassword(formPassword);
                // console.log(response.data);
                // supprimer le token du localStorage
                localStorage.removeItem('token');

                // redirection vers la loginPage
                navigate('/login');
            } else {
                alert("Le mot de passe identique à l'ancien mot de passe !");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }



    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <Container className='mt-5'>
            <h1>Mon profil</h1>
            <div>
                <p><strong>Name :</strong> {user.name}</p>
                <p><strong>Mail :</strong> {user.mail}</p>
                <Button variant="primary" onClick={() => setShow(true)}>Modifier le profil</Button>
                <Button variant="secondary" onClick={() => setModalPassword(true)}>Modifier le mot de passe</Button>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier mes informations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nom d’utilisateur</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={form.mail}
                                onChange={(e) => setForm({ ...form, mail: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
                        <Button type="submit" variant="primary">Enregistrer</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={modalPassword} onHide={() => setModalPassword(false)}>
                <Form onSubmit={handleUpdatePassword}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier mot de passe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>ancien mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                value={formPassword.oldPassword}
                                onChange={(e) => setFormPassword({ ...formPassword, oldPassword: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>nouveau mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                value={formPassword.newPassword}
                                onChange={(e) => setFormPassword({ ...formPassword, newPassword: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalPassword(false)}>Annuler</Button>
                        <Button type="submit" variant="primary">Enregistrer</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}

export default ProfilePage;