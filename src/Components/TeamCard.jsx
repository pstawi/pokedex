import { useEffect, useState } from "react" // Hooks React
import PokemonCard from "./PokemonCard" // Composant d'affichage d'un Pokémon
import { deleteTeam } from "../services/teamService" // Fonction pour supprimer une équipe
import { Button } from "react-bootstrap" // Composant bouton stylisé Bootstrap

// Composant principal pour afficher une liste d'équipes
const TeamCard = ({ tabEquipes }) => {
  const [teams, setTeams] = useState([]) // État local contenant les équipes à afficher

  // Fonction appelée lors de la suppression d'une équipe
  const handleDelete = async (idTeams) => {
    try {
      await deleteTeam(idTeams) // Supprime l’équipe via le service
      location.reload()  // Recharge la page (peut être amélioré)
    } catch (error) {
      console.log(error) // Affiche l'erreur en console
    }
  }

  // Met à jour l’état local lorsque la prop 'tabEquipes' change
  useEffect(() => {
    setTeams(tabEquipes)
  }, [tabEquipes])

  return (
    // Conteneur principal des cartes d’équipes
    <div className="d-flex flex-column gap-4">
      {teams.map((team) => (
        <div key={team.teamName} className="w-100"> {/* Utiliser idTeams serait plus robuste */}
          
          {/* Bouton pour supprimer l’équipe */}
          <Button variant="danger" onClick={() => handleDelete(team.idTeams)}>supprimer</Button>
          
          {/* Carte contenant le nom de l’équipe et ses Pokémon */}
          <div className="card shadow mb-2">
            <div className="card-body">
              <h5 className="card-title">{team.teamName}</h5>
              <p className="card-text">Pokémons :</p>

              {/* Affichage des Pokémon dans l’équipe */}
              <div className="pokemon-row">
                {team.pkm.map((pokemon) => (
                  <div key={pokemon} className="pokemon-card-wrapper">
                    <PokemonCard pokeC={pokemon} /> {/* Composant d'affichage d'un Pokémon */}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamCard
