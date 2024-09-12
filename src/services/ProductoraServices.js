import { axiosConfiguration } from '../configuration/axiosConfiguration';

//obtener todas las productoras
const obtenerProductoras = () => {
     return axiosConfiguration.get('productoras/?estado=true', {
      headers:{
        'Content-Type': 'application/json'
      }
    })
} 

//crear productora
const crearProductora = (data) => {
  return axiosConfiguration.post('productoras', data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//actualizar productora
const editarProductora = (tipoId, data) => {
  return axiosConfiguration.put('productoras/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//eliminar productora
const borrarProductora = (tipoId, data) => {
  return axiosConfiguration.delete('productoras/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//productora por id
const obtenerProductoraPorId = (tipoId) => {
  return axiosConfiguration.post('productoras'+tipoId, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export{
  obtenerProductoras,
  crearProductora,
  editarProductora,
  borrarProductora,
  obtenerProductoraPorId
}