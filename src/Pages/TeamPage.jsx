import { useState, useEffect, use } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { createTeam, showTeams } from "../services/teamService";
import TeamCard from "../Components/TeamCard";

const TeamPage = () => {

    const [modalTeam, setModalTeam] = useState(false);
    const [formTeam, setFormTeam] = useState({ teamName: '' });
    const [tabEquipes, setTabEquipes] = useState([]);

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const response = await createTeam(formTeam);
            // console.log("Équipe créée avec succès:", response.data);
            setModalTeam(false);
            setFormTeam({ teamName: '' }); // Réinitialiser le formulaire
            location.reload();
        } catch (error) {
            console.error("Error creating team:", error);
        }
    }

    const fetchTeams = async () => {
        try {
            const response = await showTeams();
            setTabEquipes(response.data);
            // console.log("Équipes récupérées avec succès:", response.data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    


        return (
            <Container className='mt-5'>
                <h1>Mes équipes</h1>
                <Button variant="primary" onClick={() => setModalTeam(true)}>créer équipe</Button>


{/* affiche des équipes */}


                <div className="mt-3">
                    <h2>Liste des équipes</h2>
                    <TeamCard tabEquipes={tabEquipes} />
                </div>

                {/* modal pour créer une équipe*/}
                <Modal show={modalTeam} onHide={() => setModalTeam(false)}>
                    <Form onSubmit={handleCreateTeam}>
                        <Modal.Header closeButton>
                            <Modal.Title>création d'une équipe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Nom d’équipe</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formTeam.teamName}
                                    onChange={(e) => setFormTeam({ ...formTeam, teamName: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModalTeam(false)}>Annuler</Button>
                            <Button type="submit" variant="primary">ajouter</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        );
    }


    export default TeamPage;