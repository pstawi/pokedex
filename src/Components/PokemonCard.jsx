import { Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PokemonCard = ({ pokeC }) => {
  const [sprite, setSprite] = useState('')
  const [frenchName, setFrenchName] = useState(pokeC)

  console.log(pokeC)

  const fetchImagePokemon = async (pokeC) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeC}`)
      setSprite(res.data.sprites.other['home'].front_default)
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

  return (
    <Card className="text-center shadow card-hover">
      <Link to={`/pokemon/${pokeC}`} className="text-decoration-none text-dark">
        <Card.Img variant="top" src={sprite} alt={frenchName} />
        <Card.Body>
          <Card.Title>{frenchName}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  )
}

export default PokemonCard
