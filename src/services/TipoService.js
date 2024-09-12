import { axiosConfiguration } from '../configuration/axiosConfiguration';

//obtener todas las productoras
const obtenerTipos = () => {
     return axiosConfiguration.get('tipos', {
      headers:{
        'Content-Type': 'application/json'
      }
    })
} 

//crear tipo
const crearTipo = (data) => {
  return axiosConfiguration.post('tipos', data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//actualizar tipo
const editarTipo = (tipoId, data) => {
  return axiosConfiguration.put('tipos/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//eliminar productora
const borrarTipo = (tipoId, data) => {
  return axiosConfiguration.delete('tipos/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//productora por id
const obtenerTiposPorId = (tipoId) => {
  return axiosConfiguration.post('tipos'+tipoId, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export{
  obtenerTipos,
  crearTipo,
  editarTipo,
  borrarTipo,
  obtenerTiposPorId
}