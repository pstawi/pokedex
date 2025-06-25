import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import PokemonDetailPage from './Pages/PokemonDetailPage'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
