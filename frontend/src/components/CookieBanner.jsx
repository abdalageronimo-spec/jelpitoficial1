import { useState, useEffect } from 'react';
import { acceptCookies } from '../services/cookieApi';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // ⬇️ CONFIGURA TU ENLACE AQUÍ
  const REDIRECT_URL = "https://tulink.com"; // ← CAMBIA ESTO

  useEffect(() => {
    // Solo muestra si no ha aceptado antes (puedes usar localStorage)
    const hasAccepted = localStorage.getItem('cookiesAccepted');
    if (!hasAccepted) {
      setTimeout(() => setVisible(true), 1000); // Aparece después de 1s
    }
  }, []);

  const handleAccept = async () => {
    // Guardar en MongoDB
    await acceptCookies(REDIRECT_URL);
    
    // Guardar en localStorage para no volver a mostrar
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Redirigir
    window.location.href = REDIRECT_URL;
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        textAlign: 'center',
        maxWidth: '420px',
        width: '100%',
        animation: 'fadeIn 0.3s ease'
      }}>
        <h2 style={{ 
          color: '#333', 
          marginBottom: '15px', 
          fontSize: '1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          🍪 Aceptar Cookies
        </h2>
        
        <p style={{ 
          color: '#666', 
          marginBottom: '30px', 
          lineHeight: 1.6,
          fontSize: '0.95rem'
        }}>
          Este sitio web utiliza cookies para mejorar tu experiencia de navegación, 
          analizar el tráfico y personalizar el contenido. Al hacer clic en "Aceptar", 
          consientes el uso de todas las cookies.
        </p>

        <button 
          onClick={handleAccept}
          style={{
            padding: '16px 60px',
            background: '#28a745',
            color: '#ffffff',
            fontSize: '1.1rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
            transition: 'all 0.3s ease',
            width: '100%'
          }}
          onMouseEnter={e => {
            e.target.style.background = '#218838';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
          }}
          onMouseLeave={e => {
            e.target.style.background = '#28a745';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
          }}
        >
          Aceptar
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}