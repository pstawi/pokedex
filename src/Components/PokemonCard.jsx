import { Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import typeColors from '../utils/typeColors'

// Composant de carte pour afficher les informations d’un Pokémon
const PokemonCard = ({ pokeC }) => {
  // État pour l’image du Pokémon
  const [sprite, setSprite] = useState()

  // État pour le nom français du Pokémon (initialisé avec l'ID ou nom de base)
  const [frenchName, setFrenchName] = useState(pokeC)

  // État pour les statistiques du Pokémon
  const [pokeStats, setPokeStats] = useState([])

  // État pour les types du Pokémon (plante, feu, etc.)
  const [types, setTypes] = useState([])

  // Fonction pour récupérer l’image et les statistiques du Pokémon via l’API
  const fetchImagePokemon = async (pokeC) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeC}`)
      setSprite(res.data.sprites.other['home'].front_default)
      setPokeStats(res.data.stats)
      setTypes(res.data.types)
    } catch (error) {
      console.error("Error fetching Pokémon image:", error)
    }
  }

  // Fonction pour récupérer le nom français du Pokémon
  const fetchNomFrancais = async (pokeC) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeC}`)
      const frName = res.data.names.find(n => n.language.name === 'fr')
      if (frName) setFrenchName(frName.name)
    } catch (error) {
      console.error("Error fetching Pokémon French name:", error)
    }
  }

  // Exécution des fetchs à chaque changement de pokeC (ID ou nom du Pokémon)
  useEffect(() => {
    fetchImagePokemon(pokeC)
    fetchNomFrancais(pokeC)
  }, [pokeC])

  // Couleur de fond déterminée par le type principal du Pokémon
  const mainType = types[0]?.type.name || 'normal'
  const backgroundColor = typeColors[mainType] || '#ccc'

  return (
    // Carte visuelle du Pokémon avec un style basé sur son type
    <Card
      className="text-center shadow card-hover"
      style={{
        backgroundColor,
        color: '#fff',
        borderRadius: '1rem',
        border: 'none',
      }}
    >
      {/* Lien vers la page détaillée du Pokémon */}
      <Link to={`/pokemon/${pokeC}`} className="text-decoration-none text-white">
        {/* Image du Pokémon */}
        <Card.Img
          variant="top"
          src={sprite}
          alt={frenchName}
          style={{
            backgroundColor: '#ffffffaa',
            borderRadius: '10px',
            padding: '8px',
            marginTop: '8px',
          }}
        />
        {/* Corps de la carte : nom du Pokémon */}
        <Card.Body>
          <Card.Title className="text-capitalize">{frenchName}</Card.Title>
          {/* Statistiques du Pokémon (optionnel, actuellement commenté) */}
          {/* <Card.Text>
            {pokeStats.map((stat) => (
              <div key={stat.stat.name}>
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
              </div>
            ))}
          </Card.Text> */}
        </Card.Body>
      </Link>
    </Card>
  )
}

export default PokemonCard
