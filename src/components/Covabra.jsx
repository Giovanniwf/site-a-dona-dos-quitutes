import { useState } from 'react'
import './Covabra.css'

const LOGO = '/images/brand/covabra.png'

/**
 * Selo do Covabra, no estilo "parceiro": fica abaixo do botao de localizacao,
 * fora do texto corrido. O fundo branco e' necessario porque a marca tem
 * letras azul-marinho, que sumiriam no roxo e no dourado do site.
 *
 * Se o arquivo da logo faltar, cai no nome escrito em vez de deixar um buraco.
 */
export default function Covabra({ className = '' }) {
  const [semLogo, setSemLogo] = useState(false)

  return (
    <span className={`covabra-selo ${className}`}>
      {semLogo ? (
        <span className="covabra-nome">Covabra</span>
      ) : (
        <img
          src={LOGO}
          alt="Covabra Supermercados"
          loading="lazy"
          decoding="async"
          onError={() => setSemLogo(true)}
        />
      )}
    </span>
  )
}
