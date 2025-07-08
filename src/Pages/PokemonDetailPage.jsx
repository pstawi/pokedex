// Import des hooks et composants nécessaires
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Tabs, Tab, Table, Modal, Form } from 'react-bootstrap'
import { Container, Row, Col, Button, ListGroup, ProgressBar, Badge, Spinner } from 'react-bootstrap'
import axios from 'axios'

// Import des fichiers utilitaires et composants personnalisés
import typeColors from '../utils/typeColors'
import EvolutionCard from '../Components/EvolutionCard'
import statColors from '../utils/statColors'
import { chooseTeams, addPokemonToTeam } from '../services/teamService'

// Composant principal qui affiche les détails d’un Pokémon
function PokemonDetailPage() {
  // Récupère le paramètre de l’URL
  const { name } = useParams()
  const navigate = useNavigate()

  // Déclaration des états
  const [movesData, setMovesData] = useState([])              // Pour stocker les capacités du Pokémon
  const [activeTab, setActiveTab] = useState('infos')         // Onglet actif (infos ou moves)
  const [pokemon, setPokemon] = useState(null)                // Données générales du Pokémon
  const [frenchName, setFrenchName] = useState('')            // Nom en français
  const [evolutions, setEvolutions] = useState([])            // Liste des évolutions
  const [evolve, setEvolve] = useState(null)                  // État inutile dans ce contexte
  const [modalAddTeam, setModalAddTeam] = useState(false)     // État pour gérer la modal d’ajout d’équipe
  const [teams, setTeams] = useState([])                      // Liste des équipes utilisateur
  const [selectedTeam, setSelectedTeam] = useState('')        // Équipe sélectionnée pour l’ajout

  // Fonction pour récupérer les équipes du joueur
  const userTeams = async () => {
    try {
      const res = await chooseTeams()
      setTeams(res.data)
    } catch (err) {
      console.error('Erreur lors de la récupération des équipes :', err)
    }
  }

  // Fonction pour ajouter le Pokémon à une équipe
  const handleAddPokemonTeam = async (e) => {
    e.preventDefault()
    try {
      await addPokemonToTeam(selectedTeam, { pokemonName: name })
      setModalAddTeam(false)
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Pokémon à l\'équipe :', error)
    }
  }

  // Récupère les données du Pokémon, son nom en français, ses évolutions et ses capacités
  useEffect(() => {
    userTeams()

    const fetchData = async () => {
      try {
        const res1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemonData = res1.data
        setPokemon(pokemonData)

        setEvolve()

        const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        const fr = res2.data.names.find(n => n.language.name === 'fr')
        if (fr) setFrenchName(fr.name)

        // Récupération de la chaîne d’évolution
        const evoUrl = res2.data.evolution_chain.url
        const evoRes = await axios.get(evoUrl)
        const evoNames = extractEvolutions(evoRes.data.chain)
        setEvolutions(evoNames)

        // Récupération des 20 premières capacités du Pokémon
        const selected = pokemonData.moves.slice(0, 20)
        const detailedMoves = await Promise.all(selected.map(async (move) => {
          const res = await axios.get(move.move.url)
          const nameFr = res.data.names.find(n => n.language.name === 'fr')?.name || move.move.name
          return {
            name: nameFr,
            power: res.data.power,
            accuracy: res.data.accuracy,
            pp: res.data.pp,
            type: res.data.type.name
          }
        }))
        setMovesData(detailedMoves)
      } catch (err) {
        console.error('Erreur de chargement :', err)
      }
    }

    fetchData()
  }, [name])

  // Fonction utilitaire pour extraire les noms des évolutions
  const extractEvolutions = (chain) => {
    const names = []
    let current = chain
    while (current && current.species) {
      names.push(current.species.name)
      current = current.evolves_to[0]
    }
    return names
  }

  // Affiche un spinner pendant le chargement des données
  if (!pokemon) {
    return <div className="text-center my-5"><Spinner animation="border" variant="danger" /></div>
  }

  // Affichage principal de la page de détails
  return (
    <Container className="my-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">← Retour</Button>

      <h2 className="text-center text-capitalize">{frenchName || name}</h2>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="infos" title="Infos">
        </Tab>

        <Tab eventKey="moves" title="Capacités">
          {movesData.length === 0 ? (
            <p>Chargement des attaques...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Puissance</th>
                  <th>Précision</th>
                  <th>PP</th>
                </tr>
              </thead>
              <tbody>
                {movesData.map((move, idx) => (
                  <tr key={idx}>
                    <td>{move.name}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: typeColors[move.type],
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '5px'
                        }}
                      >
                        {move.type}
                      </span>
                    </td>
                    <td>{move.power || '-'}</td>
                    <td>{move.accuracy || '-'}</td>
                    <td>{move.pp}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>

      <Row className="align-items-center">
        <Col md={5} className="text-center mb-4">
          <img
            src={pokemon.sprites.other['home'].front_default}
            alt={name}
            className="img-fluid"
            style={{ maxHeight: '300px' }}
            onClick={() => {
              const cry = new Audio(`https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3`)
              cry.play()
            }}
          />
        </Col>
        <Col md={7}>
          <p><strong>Type(s) :</strong> {pokemon.types.map(t => (

            <Badge
              key={t.type.name}
              bg=""
              style={{
                backgroundColor: typeColors[t.type.name],
                color: '#fff',
                marginRight: '8px'
              }}
            >
              {t.type.name}
            </Badge>
          ))}</p>

          <p><strong>Taille :</strong> {pokemon.height / 10} m</p>
          <p><strong>Poids :</strong> {pokemon.weight / 10} kg</p>
          <Button variant="success" onClick={() => setModalAddTeam(true)}>ajouter à l'équipe</Button>
          <Modal show={modalAddTeam} onHide={() => setModalAddTeam(false)}>
            <Form onSubmit={handleAddPokemonTeam}>
              <Modal.Header closeButton>
                <Modal.Title>ajout d'un pokemon dans une équipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Nom d’équipe</Form.Label>
                  <Form.Select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                  >
                    {teams.map(index => (
                      <option key={index.idTeams} value={index.idTeams}>
                        {index.teamName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalAddTeam(false)}>Annuler</Button>
                <Button type="submit" variant="primary">ajouter</Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <h5>Statistiques</h5>
          <ListGroup>
            {pokemon.stats.map(stat => (
              <ListGroup.Item key={stat.stat.name}>
                <strong>{stat.stat.name.toUpperCase()}</strong>
                <ProgressBar
                  now={stat.base_stat}
                  label={stat.base_stat}
                  max={200}
                  className="mt-1"
                  variant={statColors[stat.stat.name] || 'light'}
                />
              </ListGroup.Item>

            ))}
          </ListGroup>
        </Col>
      </Row>

      {evolutions.length > 1 && (
        <div className="mt-5">
          <h4>Évolutions</h4>
          <Row className="g-3">
            {evolutions.map(evo => (
              <Col key={evo} xs={6} md={3}>
                <Link to={`/pokemon/${evo}`} className="text-decoration-none">
                  <EvolutionCard name={evo} />
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  )
}

export default PokemonDetailPage
