// src/pages/contact.tsx

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { translations, type Language } from '../locales';

// ============================================
// 🎯 INTERFAZ: Estado del formulario
// ============================================

// Interface para tipar el estado del formulario
interface FormData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  check1: boolean;  // checkbox 1
  check2: boolean;  // checkbox 2
}

// ============================================
// 🎯 COMPONENTE
// ============================================

export default function Contact() {
  
  // ============================================
  // 📊 ESTADO: Idioma
  // ============================================
  const [currentLang] = useState<Language>('es');
  const t = translations[currentLang];
  
  
  // ============================================
  // 📊 ESTADO: Datos del formulario
  // ============================================
  
  // En lugar de tener 7 useState separados, usamos un objeto
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
    check1: false,
    check2: false,
  });
  
  // Explicación:
  // formData es un objeto que contiene todos los valores del formulario
  // setFormData es la función para actualizar ese objeto
  
  
  // ============================================
  // 📊 ESTADO: UI (loading, success, error)
  // ============================================
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Explicación:
  // - isLoading: true cuando está enviando el formulario
  // - showSuccess: true cuando se envió correctamente
  // - errorMessage: mensaje de error si algo falla
  
  
  // ============================================
  // 🎯 FUNCIÓN: Manejar cambios en inputs de texto
  // ============================================
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Actualizar el estado del formulario
    setFormData(prev => ({
      ...prev,      // Mantener los valores anteriores
      [name]: value // Actualizar solo el campo que cambió
    }));
  };
  
  // Explicación paso a paso:
  // 1. e.target es el elemento que disparó el evento (el input)
  // 2. e.target.name es el atributo "name" del input (ej: "email")
  // 3. e.target.value es lo que escribió el usuario
  // 4. ...prev copia todos los valores anteriores del objeto
  // 5. [name]: value actualiza solo el campo específico
  //
  // Ejemplo:
  // Si formData = { name: 'Juan', email: '' }
  // Y el usuario escribe en email
  // Resultado: { name: 'Juan', email: 'juan@example.com' }
  
  
  // ============================================
  // 🎯 FUNCIÓN: Manejar cambios en checkboxes
  // ============================================
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked  // Para checkboxes usamos "checked" no "value"
    }));
  };
  
  // Explicación:
  // Los checkboxes usan e.target.checked (true/false)
  // no e.target.value como los inputs de texto
  
  
  // ============================================
  // 🎯 FUNCIÓN: Validar formulario
  // ============================================
  
  const validateForm = (): boolean => {
    // Validar que los campos obligatorios no estén vacíos
    if (!formData.name.trim()) {
      setErrorMessage(t.common.error + ': ' + t.contact.name);
      return false;
    }
    
    if (!formData.lastname.trim()) {
      setErrorMessage(t.common.error + ': ' + t.contact.lastname);
      return false;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage(t.common.error + ': Email');
      return false;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Email inválido');
      return false;
    }
    
    if (!formData.phone.trim()) {
      setErrorMessage(t.common.error + ': ' + t.contact.phone);
      return false;
    }
    
    if (!formData.message.trim()) {
      setErrorMessage(t.common.error + ': ' + t.contact.message);
      return false;
    }
    
    // Validar checkboxes
    if (!formData.check1 || !formData.check2) {
      setErrorMessage('Debes aceptar los términos y condiciones');
      return false;
    }
    
    return true;
  };
  
  // Explicación:
  // - .trim() elimina espacios al inicio y final
  // - Si algún campo está vacío, retorna false
  // - emailRegex valida que el email tenga formato válido
  
  
  // ============================================
  // 🎯 FUNCIÓN: Enviar formulario
  // ============================================
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // ← MUY IMPORTANTE: previene recargar la página
    
    // Limpiar mensajes anteriores
    setErrorMessage('');
    setShowSuccess(false);
    
    // Validar
    if (!validateForm()) {
      return;
    }
    
    // Mostrar loading
    setIsLoading(true);
    
    try {
      // ============================================
      // 🌐 ENVIAR A TU API (AJAX en React)
      // ============================================
      
      // Preparar datos para enviar
      const dataToSend = new URLSearchParams();
      dataToSend.append('type', 'send_email');
      dataToSend.append('name', `${formData.name} ${formData.lastname}`);
      dataToSend.append('phone', formData.phone);
      dataToSend.append('email', formData.email);
      dataToSend.append('message', formData.message);
      
      // Enviar con fetch (equivalente a $.ajax en jQuery)
      const response = await fetch('https://voyagerlatam.com/async_site.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: dataToSend.toString(),
      });
      
      const result = await response.json();
      
      // Verificar respuesta
      if (result.code === 'ok') {
        // Éxito
        setShowSuccess(true);
        
        // Limpiar formulario
        setFormData({
          name: '',
          lastname: '',
          email: '',
          phone: '',
          message: '',
          check1: false,
          check2: false,
        });
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        
      } else {
        setErrorMessage('Error al enviar el mensaje. Intenta de nuevo.');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error de conexión. Verifica tu internet.');
      
    } finally {
      // Quitar loading (se ejecuta siempre, haya error o no)
      setIsLoading(false);
    }
  };
  
  // Explicación de async/await:
  // - async: indica que la función es asíncrona (espera respuestas)
  // - await: espera a que fetch termine antes de continuar
  // - try/catch: maneja errores
  // - finally: se ejecuta siempre al final
  
  
  // ============================================
  // 🎨 RENDER: Interfaz visual
  // ============================================
  
  return (
    <>
      {/* Banner superior */}
      <section>
        <div className="position-relative">
          <img 
            src="/images/contactusbanner.webp" 
            className="contactus-banner w-100" 
            alt="Contact Banner"
          />
          <div className="w-100 position-absolute title_con">
            <h2 className="text-white mb-0">
              {t.contact.title}
            </h2>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="pt-0">
        <div className="container box_shadow1 px-5 py-5 container_c contact-div">
          <div className="row">
            <div className="col-md-12">
              <div className="box-content box-footer box-full">
                
                <div className="text-center">
                  <h2 className="no-margin text-left">
                    {t.contact.title}
                  </h2>
                </div>

                {/* 
                  🔥 FORMULARIO
                  onSubmit ejecuta handleSubmit cuando se envía
                */}
                <form onSubmit={handleSubmit} className="contact-form">
                  
                  <div className="row text-start">
                    <h3>Datos Personales</h3>
                  </div>

                  {/* Nombre y Apellido */}
                  <div className="row pt-md-4">
                    <div className="col-md-6 my-3 my-md-0">
                      <input
                        type="text"
                        name="name" 
                        value={formData.name}  
                        onChange={handleInputChange} 
                        className="form-control space-contac input_yourp"
                        placeholder={t.contact.name}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="form-control space-contac input_yourp"
                        placeholder="Apellido"
                      />
                    </div>
                  </div>

                  {/* Email y Teléfono */}
                  <div className="row py-md-4">
                    <div className="col-md-6 my-3 my-md-0">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control space-contac input_yourp"
                        placeholder={t.contact.email}
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3 my-md-0">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control space-contac input_yourp"
                        placeholder={t.contact.phone}
                      />
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="row">
                    <div className="col-md-12">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="form-control textarea_b"
                        placeholder={t.contact.message}
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="row pt-3">
                    <div className="col-md-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="check1"
                          checked={formData.check1}  
                          onChange={handleCheckboxChange}
                          className="form-check-input"
                          id="customCheck1"
                        />
                        <label className="form-check-label ps-3" htmlFor="customCheck1">
                          Acepto términos y condiciones
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row pt-1">
                    <div className="col-md-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="check2"
                          checked={formData.check2}
                          onChange={handleCheckboxChange}
                          className="form-check-input"
                          id="customCheck2"
                        />
                        <label className="form-check-label ps-3" htmlFor="customCheck2">
                          Acepto política de privacidad
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Mensaje de error */}
                  {errorMessage && (
                    <div className="row pt-3">
                      <div className="col-md-12">
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botón de envío */}
                  <div className="row justify-content-center py-4">
                    <div className="col-md-4 w-100 text-center">
                      <button
                        type="submit"
                        className="bg_blue2 form-btn"
                        disabled={isLoading} 
                      >
                        <h3 className="text-center text-white mb-0 title_pagb">
                          {isLoading ? t.common.loading : t.contact.send}
                        </h3>
                      </button>
                    </div>
                  </div>

                  {/* Mensaje de éxito */}
                  {showSuccess && (
                    <div className="row">
                      <div className="submit-status">
                        <div className="submit-status-text success-ms">
                          <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                          <h4>{t.contact.successMessage}</h4>
                        </div>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}