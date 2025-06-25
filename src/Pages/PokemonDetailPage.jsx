import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, ListGroup, ProgressBar } from 'react-bootstrap'
import axios from 'axios'
import '../styles/homePage.css'
import typeColors from '../utils/typeColors'


function PokemonDetailPage() {
  const { name } = useParams()
  const navigate = useNavigate()

  const [pokemon, setPokemon] = useState(null)
  const [frenchName, setFrenchName] = useState('')

  useEffect(() => {
    const fetchDetails = async () => {
      const res1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      setPokemon(res1.data)

      const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      const frName = res2.data.names.find(n => n.language.name === 'fr')
      if (frName) setFrenchName(frName.name)
    }

    fetchDetails()
  }, [name])

  if (!pokemon) return <p className="text-center mt-5">Chargement...</p>

  return (
    <Container className="my-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">← Retour</Button>

      <h2 className="text-center text-capitalize">{frenchName || name}</h2>

      <Row className="align-items-center">
        <Col md={5} className="text-center mb-4">
          <img
            src={pokemon.sprites.other['home'].front_default}
            alt={name}
            className="img-fluid"
            style={{ maxHeight: '300px' }}
          />
        </Col>
        <Col md={7}>
          <p><strong>Type(s) :</strong> {pokemon.types.map(t => (
  <span key={t.type.name}
    className="badge me-2"
    style={{
      backgroundColor: typeColors[t.type.name] || '#aaa',
      color: '#fff'
    }}>
    {t.type.name}
  </span>
))}</p>
          <p><strong>Taille :</strong> {pokemon.height / 10} m</p>
          <p><strong>Poids :</strong> {pokemon.weight / 10} kg</p>

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
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default PokemonDetailPage
