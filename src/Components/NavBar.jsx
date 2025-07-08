// Import des composants nécessaires de React et des librairies
import { Navbar, Container, NavLink, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

// Composant de barre de navigation
function NavBar() {
  const navigate = useNavigate()

  // Récupération du token depuis le localStorage
  const token = localStorage.getItem('token')
  let userName = ''

  // Si un token existe, on décode le nom d'utilisateur
  if (token) {
    // Décodage du token JWT pour extraire le nom de l’utilisateur
    userName = jwtDecode(token).username
  }

  // Fonction de déconnexion : supprime le token et redirige vers la page d’accueil
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  // Fonction de connexion : redirige vers la page de login
  const login = () => {
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Logo du site ou nom de la marque */}
        <Navbar.Brand href="/">Pokedex</Navbar.Brand>

        {/* Bouton pour le menu responsive */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Lien vers la page d’inscription */}
            <Nav.Link href="/register">inscription</Nav.Link>

            {/* Affichage conditionnel : si connecté */}
            {token ? (
              <>
                {/* Liens supplémentaires si l'utilisateur est connecté */}
                <Nav.Link href="/team">mes équipes</Nav.Link>
                <Nav.Link href="/profile">profile</Nav.Link>

                {/* Bouton pour se déconnecter */}
                <Button variant='danger' onClick={logout}>Déconnexion</Button>

                {/* Message de bienvenue */}
                <p>bienvenue, {userName}</p>
              </>
            ) : (
              // Si non connecté : afficher bouton de connexion
              <Button variant="primary" onClick={login}>connexion</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
