export const paths = {
  /** Página de verificación del token */
  index: '',
  /** Página principal */
  home: '/inicio',

  //#region Formulario de carga del acta
  /** Página para cargar la imágen el acta */
  uploadActa: '/acta/subir',
  /** Página para verificar la imágen del acta */
  verifyActa: '/acta/verificar',
  /** Página para cargar la información del acta en el formulario */
  loadActaInfo: '/acta/cargar',
  //#endregion

  //#region Estados de envío del formulario
  /** Página de éxito al enviar el formulario */
  sendSuccess: '/acta/gracias',
  /** Página de advertencia al enviar el formulario */
  sendWarning: '/acta/advertencia',
  /** Página de error al enviar el formulario */
  uploadFailed: '/acta/error',
  //#endregion

  /** Página con las mesas de votación cargadas */
  votationTables: '/mesas',
  /** Página con los resultados de la votación @deprecated */
  results: '/resultados',
  /** Página con los resultados de la votación @deprecated */
  irregularities: '/irregularidades',
};
