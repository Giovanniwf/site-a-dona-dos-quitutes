import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  )
}

export default App
