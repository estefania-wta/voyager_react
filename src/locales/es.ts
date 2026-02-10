// src/locales/es.ts

export const es = {
  // Header / Navegación
  nav: {
    voucher: "Voucher",
    contact: "Contáctanos",
    emergency: "Emergencia",
    quote: "Cotizar",
    agentAccess: "Acceso Agentes",
  },

  // Footer
  footer: {
    aboutUs: "Sobre Nosotros",
    termsAndConditions: "Términos y Condiciones",
    privacyPolicy: "Política de Privacidad",
    followUs: "Síguenos",
    quickLinks: "Enlaces Rápidos",
    whoWeAre: "Quiénes Somos",
    products: "Productos",
    faq: "Preguntas Frecuentes",
    contact: "Contáctanos",
    travelTips: "Consejos de Viaje",
    support: "Soporte",
    generalConditions: "Condiciones Generales",
    webUsageConditions: "Condiciones de Uso Web",
    contactInfo: "Información de Contacto",
    address: "2050 W 84th St, Hialeah, FL 33014, EE.UU.",
    allRightsReserved: "Todos los derechos reservados",
  },

  // Página de contacto
  contact: {
    title: "Contáctanos",
    formTitle: "Formulario de Contacto",
    personalData: "Datos Personales",
    name: "Nombre",
    lastname: "Apellido",
    email: "Correo Electrónico",
    phone: "Teléfono",
    message: "Mensaje",
    comments: "Comentarios",
    send: "Enviar",
    sending: "Enviando...",
    successMessage: "Mensaje enviado correctamente",
    errorMessage: "Error al enviar el mensaje",
    required: "Este campo es obligatorio",
    invalidEmail: "Email inválido",
    check1: "Acepto los términos y condiciones",
    check2: "Acepto la política de privacidad",
    mustAcceptTerms: "Debes aceptar los términos y condiciones",
  },

  // Página de emergencia
  emergency: {
    title: "Emergencia",
    callUs: "Llámanos",
    available24h: "Disponible 24/7",
    emergencyNumber: "Número de Emergencia",
    whatToDo: "¿Qué hacer en caso de emergencia?",
  },

  // Página de planes
  plans: {
    title: "Nuestros Planes",
    selectPlan: "Seleccionar Plan",
    compare: "Comparar",
    viewDetails: "Ver Detalles",
    from: "Desde",
    perPerson: "Por Persona",
    coverage: "Cobertura",
    benefits: "Beneficios",
  },

  // Página FAQ
  faq: {
    title: "Preguntas Frecuentes",
    question: "Pregunta",
    answer: "Respuesta",
    searchPlaceholder: "Buscar pregunta...",
    noResults: "No se encontraron resultados",
  },

  // Join Sales Team
  joinSales: {
    title: "Únete a Nuestro Equipo de Ventas",
    apply: "Aplicar",
    firstName: "Nombre",
    lastName: "Apellido",
    position: "Posición",
    experience: "Experiencia",
    resume: "Currículum",
    uploadResume: "Subir Currículum",
  },

  // Login
  login: {
    title: "Iniciar Sesión",
    email: "Correo",
    password: "Contraseña",
    submit: "Entrar",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes cuenta?",
    register: "Regístrate",
    rememberMe: "Recuérdame",
  },

  // Voucher
  voucher: {
    title: 'Tu Plan',
    formTitle: 'Consultar Voucher',
    userInfo: 'Información del Usuario',
    name: 'Nombre',
    lastname: 'Apellido',
    birthdate: 'Fecha de Nacimiento',
    voucherNumber: 'Número de Voucher',
    voucherCode: 'Código del Voucher',
    search: 'Buscar',
    download: 'Descargar',
    downloadPDF: 'Descargar PDF',
    back: 'Volver',
    notFound: 'Voucher no encontrado',
    details: 'Detalles del Voucher',
    statusLabel: 'Estado',
    passenger: 'Pasajero',
    validFrom: 'Válido desde',
    validUntil: 'Válido hasta',
    
    // Modal de información
    infoAboutVoucher: 'Información del Voucher',
    voucherDetails: 'Detalles del Voucher',
    
    // Tabs
    tabVoucher: 'Voucher',
    tabPassengers: 'Pasajeros',
    tabAdditional: 'Adicionales',
    tabDisabled: 'Sin datos',
    
    // Pasajeros
    passengers: 'Pasajeros',
    passengerLabel: 'Pasajero',
    noPassengers: 'No hay información de pasajeros',
    document: 'Documento',
    email: 'Email',
    phone: 'Teléfono',
    gender: 'Género',
    country: 'País',
    
    // Raiders/Adicionales
    raiders: 'Servicios Especiales',
    additionalServices: 'Servicios Adicionales',
    noRaiders: 'No tiene beneficios adicionales',
    raiderTitle: 'Servicio Especial',
    raiderId: 'ID Raider',
    raiderName: 'Nombre del Servicio',
    raiderValue: 'Valor',
    raiderCost: 'Costo',
    raiderDescription: 'Descripción',
    
    // Estados
    loading: 'Consultando voucher...',
    loadingMessage: 'Por favor espere...',
    
    // Mensajes de error
    notFoundTitle: 'Voucher no encontrado',
    notFoundMessage: 'No se encontró ningún voucher con los datos proporcionados.',
    error403Title: 'Error de acceso',
    error403Message: 'La información proporcionada es incorrecta o el acceso fue denegado.',
    incompleteTitle: 'Datos incompletos',
    incompleteMessage: 'Por favor complete todos los campos requeridos para buscar el voucher.',
    noDataPdf: 'No hay datos para generar el PDF',
    generatedBy: 'Generado por Voyager Travel Assist - ',
    
    // Campos del voucher
    voucherKeys: {
      codigo: 'Código',
      salida: 'Fecha de Salida',
      retorno: 'Fecha de Retorno',
      programaplan: 'Programa del Plan',
      nombre_contacto: 'Nombre de Contacto',
      email_contacto: 'Email de Contacto',
      telefono_contacto: 'Teléfono de Contacto',
      comentarios: 'Comentarios',
      nombre_agencia: 'Nombre de Agencia',
      total: 'Total',
      fecha: 'Fecha de Compra',
      statusKey: 'Estado',
      origin: 'Origen',
      dest: 'Destino',
    },
    
    // Estados del voucher
    status: {
      '1': 'Activo',
      '2': 'Por activar',
      '4': 'Inválido',
      '5': 'Anulado',
    },
  },
  
  // Común
  common: {
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    close: 'Cerrar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    search: 'Buscar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    viewMore: 'Ver más',
    viewLess: 'Ver menos',
  },
};
