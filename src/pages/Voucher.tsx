// src/pages/Voucher.tsx

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { translations, type Language } from '../locales';
import VoucherModal from '../components/voucher/VoucherModal';

interface FormData {
  name: string;
  lastname: string;
  birthdate: string;
  voucherNumber: string;
}

interface VoucherData {
  [key: string]: unknown;
}

interface PassengerData {
  name: string;
  document: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
  country: string;
}

interface RaiderData {
  id_raider: string;
  value: string;
  cost: string;
  name: string;
  desc: string;
}

export default function Voucher() {
  
  const [currentLang] = useState<Language>('es');
  const t = translations[currentLang];
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    birthdate: '',
    voucherNumber: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  
  const [voucherData, setVoucherData] = useState<VoucherData | null>(null);
  const [passengersData, setPassengersData] = useState<PassengerData[] | null>(null);
  const [raidersData, setRaidersData] = useState<RaiderData[] | null>(null);
  
  const [errorMessage, setErrorMessage] = useState('');
  
  // Configuración de la API
  const API_CONFIG = {
    VOUCHER_URL: 'https://ilsadmin.com/app/api/v2/voucher',
    PASSENGER_URL: 'https://ilsadmin.com/app/api/v2/passenger',
    RAIDER_URL: 'https://ilsadmin.com/app/api/v2/raider',
    API_TOKEN: '78e731027d8fd50ed642340b7c9a63b3',
    PREFIX: 'VY',
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage(`${t.voucher.name} ${t.contact.required}`);
      setShowIncompleteModal(true);
      return false;
    }
    
    if (!formData.lastname.trim()) {
      setErrorMessage(`${t.voucher.lastname} ${t.contact.required}`);
      setShowIncompleteModal(true);
      return false;
    }
    
    if (!formData.birthdate) {
      setErrorMessage(`${t.voucher.birthdate} ${t.contact.required}`);
      setShowIncompleteModal(true);
      return false;
    }
    
    if (!formData.voucherNumber.trim()) {
      setErrorMessage(`${t.voucher.voucherNumber} ${t.contact.required}`);
      setShowIncompleteModal(true);
      return false;
    }
    
    return true;
  };
  
  const searchPassengers = async (voucherId: string): Promise<PassengerData[]> => {
    const queryString = new URLSearchParams({
      id: voucherId,
      prefix: API_CONFIG.PREFIX
    }).toString();
    
    const response = await fetch(`${API_CONFIG.PASSENGER_URL}?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.content && Array.isArray(data.content)) {
      return data.content;
    }
    
    return [];
  };
  
  const searchRaiders = async (voucherId: string): Promise<RaiderData[]> => {
    const queryString = new URLSearchParams({
      id: voucherId,
      prefix: API_CONFIG.PREFIX
    }).toString();
    
    const response = await fetch(`${API_CONFIG.RAIDER_URL}?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.content && Array.isArray(data.content)) {
      return data.content.length > 0 ? data.content : [];
    }
    
    return [];
  };
  
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const params = {
        code: formData.voucherNumber,
        prefix: API_CONFIG.PREFIX,
        name: formData.name,
        lastname: formData.lastname,
        birthdate: formData.birthdate
      };
      
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_CONFIG.VOUCHER_URL}?${queryString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      if (data.status === 'OK' && data.content && Object.keys(data.content).length > 0) {
        setVoucherData(data.content);
        
        // Buscar pasajeros
        try {
          const voucherId = data.content.id;
          if (voucherId) {
            const passengers = await searchPassengers(voucherId);
            setPassengersData(passengers);
          } else {
            setPassengersData([]);
          }
        } catch (passengerError) {
          console.error('Error fetching passengers:', passengerError);
          setPassengersData(null);
        }
        
        // Buscar raiders
        try {
          const voucherId = data.content.id;
          if (voucherId) {
            const raiders = await searchRaiders(voucherId);
            setRaidersData(raiders);
          } else {
            setRaidersData([]);
          }
        } catch (raiderError) {
          console.error('Error fetching raiders:', raiderError);
          setRaidersData(null);
        }
        
        setShowVoucherModal(true);
      } else {
        setVoucherData(null);
        setPassengersData(null);
        setRaidersData(null);
        setShowNotFoundModal(true);
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      setVoucherData(null);
      setPassengersData(null);
      setRaidersData(null);
      
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      if (errorMsg.includes('403') || errorMsg.includes('Forbidden')) {
        setErrorMessage(t.voucher.error403Message);
        setShowErrorModal(true);
      } else if (errorMsg.includes('INVALID_DATA')) {
        setShowNotFoundModal(true);
      } else {
        setErrorMessage(errorMsg);
        setShowErrorModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {/* Banner */}
      <section className="px-md-5 mx-md-5">
        <div className="container-fluid position-relative">
          <img 
            src="/images/back_yourp.webp" 
            className="w-100"
            style={{ 
              height: 'auto', 
              borderEndEndRadius: '30px', 
              borderEndStartRadius: '30px' 
            }}
            alt="Your Plan Banner"
          />
          <h2 className="position-absolute title_yourp voucher-title-banner text-white">
            {t.voucher.title}
          </h2>
        </div>
      </section>

      <br />

      {/* Formulario de búsqueda */}
      <section className="pt-0 w-75 m-auto" style={{ marginTop: '-115px !important' }}>
        <div className="container box_shadow1 px-5 py-5 container_c contact-div">
          <div className="row">
            <div className="col-md-12">
              <div className="box-content box-footer box-full">
                
                <div className="text-center mb-4">
                  <h2>{t.voucher.formTitle}</h2>
                </div>

                <form onSubmit={handleSearch} style={{ fontSize: '18px' }}>
                  
                  <div className="row text-start mb-4">
                    <h3 style={{ fontSize: '24px' }}>
                      {t.voucher.userInfo}
                    </h3>
                  </div>

                  <div className="row pt-md-4">
                    <div className="col-md-6 my-3 my-md-0">
                      <label htmlFor="name" className="form-label fs-5">
                        {t.voucher.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control validar space-contac input_yourp fs-5"
                        placeholder={t.voucher.name}
                      />
                    </div>
                    
                    <div className="col-md-6 my-3 my-md-0">
                      <label htmlFor="lastname" className="form-label fs-5">
                        {t.voucher.lastname}
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="form-control validar space-contac input_yourp fs-5"
                        placeholder={t.voucher.lastname}
                      />
                    </div>
                  </div>

                  <div className="row pt-md-4">
                    <div className="col-md-6 my-3 my-md-0">
                      <label htmlFor="birthdate" className="form-label fs-5">
                        {t.voucher.birthdate}
                      </label>
                      <input
                        type="date"
                        name="birthdate"
                        id="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        className="form-control validar email space-contac input_yourp fs-5"
                      />
                    </div>
                    
                    <div className="col-md-6 my-3 my-md-0">
                      <label htmlFor="voucherNumber" className="form-label fs-5">
                        {t.voucher.voucherNumber}
                      </label>
                      <input
                        type="text"
                        name="voucherNumber"
                        id="voucherNumber"
                        value={formData.voucherNumber}
                        onChange={handleInputChange}
                        className="form-control validar space-contac input_yourp fs-5"
                        placeholder={t.voucher.voucherCode}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-center py-4">
                    <div className="col-md-4 w-100 text-center">
                      <button 
                        type="submit" 
                        className="bg_blue2 form-btn" 
                        style={{ fontSize: '20px' }}
                        disabled={isLoading}
                      >
                        <h3 className="text-center text-white mb-0 title_pagb" style={{ fontSize: '22px !important' }}>
                          {isLoading ? t.voucher.loading : t.voucher.search}
                        </h3>
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Voucher */}
      {showVoucherModal && voucherData && (
        <VoucherModal
          show={showVoucherModal}
          onClose={() => setShowVoucherModal(false)}
          voucherData={voucherData}
          passengersData={passengersData}
          raidersData={raidersData}
          t={t.voucher}
        />
      )}

      {/* Modal: Not Found */}
      {showNotFoundModal && (
        <SimpleModal
          show={showNotFoundModal}
          onClose={() => setShowNotFoundModal(false)}
          title={t.voucher.notFoundTitle}
          message={t.voucher.notFoundMessage}
          type="error"
        />
      )}

      {/* Modal: Error */}
      {showErrorModal && (
        <SimpleModal
          show={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title={t.voucher.error403Title}
          message={errorMessage || t.voucher.error403Message}
          type="warning"
        />
      )}

      {/* Modal: Incomplete */}
      {showIncompleteModal && (
        <SimpleModal
          show={showIncompleteModal}
          onClose={() => setShowIncompleteModal(false)}
          title={t.voucher.incompleteTitle}
          message={errorMessage || t.voucher.incompleteMessage}
          type="info"
        />
      )}

      {/* Modal: Loading */}
      {isLoading && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">{t.voucher.loading}</span>
                </div>
                <p className="mt-3">{t.voucher.loadingMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Componente auxiliar para modales simples
interface SimpleModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info';
}

function SimpleModal({ show, onClose, title, message, type }: SimpleModalProps) {
  if (!show) return null;
  
  const icons = {
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
        <path fill="#dc2626" fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0a10 10 0 0 1-20 0m7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3l-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3l2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6z" clipRule="evenodd"/>
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
        <path fill="#f59e0b" d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"/>
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
        <path fill="#0284c7" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/>
      </svg>
    ),
  };
  
  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '20px', border: 'none' }}>
          <div className="modal-header justify-content-center pt-4" style={{ borderBottom: 'none' }}>
            <div className="text-center">
              {icons[type]}
            </div>
          </div>
          <div className="modal-body text-center px-5">
            <h4 className="modal-title w-100 mb-3">{title}</h4>
            <p className="text-muted" style={{ fontSize: '18px' }}>
              {message}
            </p>
          </div>
          <div className="modal-footer justify-content-center pb-4" style={{ borderTop: 'none' }}>
            <button 
              type="button" 
              className="btn bg_blue4 text-white px-5" 
              style={{ fontSize: '18px', borderRadius: '10px' }}
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}