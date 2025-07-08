import { useEffect, useState } from 'react'
import axios from 'axios'

function EvolutionCard({ name }) {
  const [sprite, setSprite] = useState()
  const [frenchName, setFrenchName] = useState(name)

  useEffect(() => {
    // Image
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        setSprite(res.data.sprites.front_default)
      })

    // Nom en français
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .then(res => {
        const fr = res.data.names.find(n => n.language.name === 'fr')
        if (fr) setFrenchName(fr.name)
      })
  }, [name])

  return (
    <div className="text-center border rounded p-2 bg-light shadow-sm" style={{ minWidth: 120 }}>
      <img src={sprite} alt={frenchName} style={{ height: '96px' }} />
      <p className="text-capitalize mt-2">{name}</p>
    </div>
  )
}

export default EvolutionCard
