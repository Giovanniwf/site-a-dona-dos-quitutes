import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { AppContent } from './App.jsx'

// Usado apenas pelo build (scripts/prerender.mjs) para gerar o HTML estatico
// que vai dentro de <div id="root">. Nada disso vai para o bundle do navegador.
export function render() {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={['/']}>
        <AppContent />
      </MemoryRouter>
    </StrictMode>,
  )
}
