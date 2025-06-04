export function handlingErros (error) {
  
  if(error.response?.status === 400) {
    return "Los datos ingresados son incorrectos."
  }

  if (error.response?.status === 401 ) {
    return  error.response.data.message || "Acceso denegado."
  }

  if (error.response?.status === 404) {
    return error.response.data.message || "Recurso no encontrado."
  }

    if (error.response?.status === 409) {
    return error.response.data.message || "Hubo un conflicto en la operacion."
  }

  if (error.response?.status === 500) {
    return error.response.data.message || "Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde."
  }

  if(error.message == "Network Error") {
    return "No se pudo conectar con el servidor. Verifica si el servicio está disponible."
  }

  return "Ocurrió un error desconocido. Por favor, revisa tu conexión."
}