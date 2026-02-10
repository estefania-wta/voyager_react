// src/components/layouts/Header.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { translations, type Language } from '../../locales';
import '../../styles/nav.css';

export default function Header() {
  
  const [currentLang, setCurrentLang] = useState<Language>('es');
  
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };
  
  const t = translations[currentLang];
  
  return (
    <header className="header default">
      <div className="topbar" style={{ display: 'none' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="d-block d-md-flex align-items-center text-center">
                <div className="d-inline-block py-1">
                  <ul className="list-unstyled"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar bg-white navbar-static-top navbar-expand-lg">
        <div className="container-fluid">
          
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
          >
            <img src="/images/hamburguer.png" width="18" height="18" alt="Menu" />
          </button>

          <Link className="navbar-brand" to="/">
            <img
              className="img-logo"
              src="/images/voyagerlogo.png"
              width="536"
              height="127"
              alt="Voyager Logo"
            />
          </Link>

          <div className="navbar-collapse collapse justify-content-end">
            <ul className="nav navbar-nav">
              
              <li className="nav-item">
                <Link to="/yourplan" className="nav-link linkmenu1">
                  {t.nav.voucher}
                  <img src="/images/lineabm.png" className="ms-4 linemenu" alt="" />
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link linkmenu1">
                  {t.nav.contact}
                  <img src="/images/lineabm.png" className="ms-4 linemenu" alt="" />
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/emergency" className="nav-link linkmenu1">
                  {t.nav.emergency}
                  <img src="/images/lineabm.png" className="ms-4 linemenu" alt="" />
                </Link>
              </li>

              <li className="nav-item">
                <a
                  href="https://voyagerlatam.com/app/pages/cotizador.php"
                  className="nav-link linkmenu1"
                >
                  {t.nav.quote}
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="https://voyagerlatam.com/app/pages/login.php"
                  className="nav-link text-white text-center link_login title_pagl ms-md-3"
                >
                  {t.nav.agentAccess}
                </a>
              </li>

              <li className="dropdown nav-item">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                  <img src="/images/translator.png" alt="Translator" width="34" height="24" />
                </a>
                
                <ul className="dropdown-menu start-50">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange('es')}
                    >
                      Español
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange('en')}
                    >
                      English
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange('pt')}
                    >
                      Português
                    </button>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}