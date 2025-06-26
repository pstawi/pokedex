import { Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import typeColors from '../utils/typeColors'

const PokemonCard = ({ pokeC }) => {
  const [sprite, setSprite] = useState()
  const [frenchName, setFrenchName] = useState(pokeC)
  const [pokeStats, setPokeStats] = useState([])
  const [types, setTypes] = useState([])

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

  const fetchNomFrancais = async (pokeC) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeC}`)
      const frName = res.data.names.find(n => n.language.name === 'fr')
      if (frName) setFrenchName(frName.name)
    } catch (error) {
      console.error("Error fetching Pokémon French name:", error)
    }
  }

  useEffect(() => {
    fetchImagePokemon(pokeC)
    fetchNomFrancais(pokeC)
  }, [pokeC])

  const mainType = types[0]?.type.name || 'normal'
  const backgroundColor = typeColors[mainType] || '#ccc'

  return (
    <Card
      className="text-center shadow card-hover"
      style={{
        backgroundColor,
        color: '#fff',
        borderRadius: '1rem',
        border: 'none',
      }}
    >
      <Link to={`/pokemon/${pokeC}`} className="text-decoration-none text-white">
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
        <Card.Body>
          <Card.Title className="text-capitalize">{frenchName}</Card.Title>
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
