import { axiosConfiguration } from '../configuration/axiosConfiguration';

//obtener todas las productoras
const obtenerGeneros = () => {
     return axiosConfiguration.get('generos/?estado=true', {
      headers:{
        'Content-Type': 'application/json'
      }
    })
} 

//crear productora
const crearGenero = (data) => {
  return axiosConfiguration.post('generos', data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//actualizar productora
const editarGenero = (tipoId, data) => {
  return axiosConfiguration.put('generos/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//eliminar productora
const borrarGenero = (tipoId, data) => {
  return axiosConfiguration.delete('generos/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//productora por id
const obtenerGeneroPorId = (tipoId) => {
  return axiosConfiguration.post('generos'+tipoId, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export{
  obtenerGeneros,
  crearGenero,
  editarGenero,
  borrarGenero,
  obtenerGeneroPorId
}