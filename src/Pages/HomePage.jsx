// Import des hooks, modules et composants nécessaires
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import PokemonCard from '../Components/PokemonCard'
import '../styles/homePage.css'

// Composant principal : page d’accueil affichant une liste paginée de Pokémon
function HomePage() {
  // État pour stocker les Pokémon récupérés
  const [pokemons, setPokemons] = useState([])

  // État pour la barre de recherche
  const [search, setSearch] = useState('')

  // État pour la pagination (numéro de la page)
  const [page, setPage] = useState(0)

  // Fonction pour récupérer les Pokémon en fonction de la page
  const fetchPokemons = async () => {
    const offset = page * 20 // PokeAPI fonctionne par offset
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
    setPokemons(res.data.results) // On stocke la liste des Pokémon
  }

  // Appel de l'API à chaque changement de page
  useEffect(() => {
    fetchPokemons()
  }, [page])

  // Filtrage des Pokémon selon le texte de recherche (nom)
  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  // Rendu du composant
  return (
    <Container className="my-4">
      {/* Titre principal de la page */}
      <h2 className="text-center mb-4">Liste des Pokémon</h2>

      {/* Champ de recherche */}
      <Form.Control
        type="text"
        placeholder="Rechercher un Pokémon"
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Boutons de pagination en haut */}
      <div className="d-flex justify-content-between mt-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Précédent
        </Button>
        <Button onClick={() => setPage(page + 1)}>
          Suivant
        </Button>
      </div>
      <br />

      {/* Affichage des cartes Pokémon dans une grille responsive */}
      <Row>
        {filteredPokemons.map(pokemon => (
          <Col key={pokemon.name} xs={6} md={4} lg={3} className="mb-4">
            {/* Composant PokemonCard pour chaque Pokémon */}
            <PokemonCard pokeC={pokemon.name} />
          </Col>
        ))}
      </Row>

      {/* Boutons de pagination en bas */}
      <div className="d-flex justify-content-between mt-4">
        <Button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
          Précédent
        </Button>
        <Button onClick={() => setPage(page + 1)}>
          Suivant
        </Button>
      </div>
    </Container>
  )
}

export default HomePage
