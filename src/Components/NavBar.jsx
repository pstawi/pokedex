import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Pokédex</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar
