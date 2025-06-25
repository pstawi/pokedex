import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import PokemonCard from '../Components/PokemonCard'
import '../styles/homePage.css'


function HomePage() {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const fetchPokemons = async () => {
    const offset = page * 20
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
    setPokemons(res.data.results)
  }

  useEffect(() => {
    fetchPokemons()
  }, [page])

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Liste des Pokémon</h2>

      <Form.Control
        type="text"
        placeholder="Rechercher un Pokémon"
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="d-flex justify-content-between mt-4">
        <Button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
          Précédent
        </Button>
        <Button onClick={() => setPage(page + 1)}>
          Suivant
        </Button>
      </div>
      <br />

      <Row>
        {filteredPokemons.map(pokemon => (
          <Col key={pokemon.name} xs={6} md={4} lg={3} className="mb-4">
            <PokemonCard pokeC={pokemon.name} />
          </Col>
        ))}
      </Row>

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
