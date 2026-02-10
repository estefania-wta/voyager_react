// src/components/layouts/Footer.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { translations, type Language } from '../../locales';
import '../../styles/footer.css';

export default function Footer() {
  
  const [currentLang] = useState<Language>('es');
  const t = translations[currentLang];
  
  // URLs de documentos según idioma
  const getDocumentUrls = () => {
    if (currentLang === 'es') {
      return {
        webUse: 'https://voyagerlatam.com/app/admin/documents/generals/120180910040939.pdf',
        conditions: 'https://voyagerlatam.com/app/admin/documents/generals/120240624070605.pdf',
        policies: '/files/politicas_de_privacidad.pdf',
      };
    } else {
      return {
        webUse: 'https://voyagerlatam.com/app/admin/documents/generals/120231019091005.pdf',
        conditions: 'https://voyagerlatam.com/app/admin/documents/generals/120240624070601.pdf',
        policies: 'https://voyagerlatam.com/app/admin/documents/generals/120231019091017.pdf',
      };
    }
  };
  
  const docs = getDocumentUrls();
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <footer className="footer bg_blue2">
        <div className="footer-top">
          <div className="container-fluid">
            <div className="row">
              
              {/* Logo */}
              <div className="col-6 col-sm-3 col-md-2 mt-3 mt-md-0 me-md-4">
                <Link to="/">
                  <img 
                    className="img-fluid mt-md-5" 
                    style={{ width: '85%' }} 
                    src="/images/logo_w.avif"
                    alt="Voyager Travel Assist"
                  />
                </Link>
              </div>

              {/* Enlaces Rápidos */}
              <div className="col-sm-3 col-md-3 mt-5">
                <h5 className="text-white mb-2 mb-sm-4 fw-normal">
                  {t.footer.quickLinks}
                </h5>
                <div className="footer-link">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link to="/#aboutus" className="option">
                        {t.footer.whoWeAre}
                      </Link>
                    </li>
                    <li>
                      <Link to="/#products">
                        {t.footer.products}
                      </Link>
                    </li>
                    <li>
                      <Link to="/#faq">
                        {t.footer.faq}
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                        {t.footer.contact}
                      </Link>
                    </li>
                    <li>
                      <Link to="/traveltips">
                        {t.footer.travelTips}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Soporte */}
              <div className="col-sm-3 col-md-3 mt-5">
                <h5 className="text-white mb-2 mb-sm-4 fw-normal">
                  {t.footer.support}
                </h5>
                <div className="footer-link">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a 
                        href={docs.conditions} 
                        className="option text-white" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {t.footer.generalConditions}
                      </a>
                    </li>
                    <li>
                      <a 
                        href={docs.webUse} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {t.footer.webUsageConditions}
                      </a>
                    </li>
                    <li>
                      <a 
                        href={docs.policies} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {t.footer.privacyPolicy}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="col-sm-3 col-md-3 mt-5">
                <div className="footer-contact-info">
                  <h5 className="text-white mb-3 fw-normal">
                    {t.footer.contactInfo}
                  </h5>
                  <div className="contact-address">
                    
                    {/* Dirección */}
                    <div className="contact-item">
                      <p className="footer-direction">
                        {t.footer.address}
                      </p>
                    </div>
                    
                    {/* Teléfonos */}
                    <div className="contact-item">
                      <img 
                        src="/images/FooterPhone.png" 
                        className="me-4 footer-icon" 
                        height="20"
                        alt="Phone"
                      />
                      <label className="mb-0 fnormal text-start">
                        <a href="tel:+13054400418">
                          +1 (305) 440-0418<br /> 
                          +1 863-204-2848
                        </a>
                      </label>
                    </div>
                    
                    {/* Email */}
                    <div className="contact-item">
                      <img 
                        src="/images/FooterEmail.png" 
                        className="me-3 footer-icon" 
                        height="30"
                        alt="Email"
                      />
                      <a 
                        className="text-white" 
                        href="mailto:info@voyagerassist.com"
                      >
                        info@voyagerassist.com
                      </a>
                    </div>
                    
                  </div>
                </div>
              </div>

            </div>

            <hr className="mt-3 pb-0 text-white" />

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p className="mb-0">
                  {t.footer.allRightsReserved} © {currentYear} Voyager Travel Assist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <div id="back-to-top" className="back-to-top">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="30" 
          height="30" 
          viewBox="0 0 48 48"
        >
          <path 
            fill="none" 
            stroke="#ffffff" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4"
            d="m13 30l12-12l12 12" 
          />
        </svg>
      </div>
    </>
  );
}